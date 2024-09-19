import VerificationCodeType from "../constants/verificationCodeTypes";
import UserModel from "../models/user.model";
import SessionModel from "../models/session.model";
import VerificationCodeModel from "../models/verificationCode.model";
import {
  oneYearFromNow,
  ONE_DAY_MS,
  thirtyDaysFromNow,
  FIVE_MINUTES_AGO,
  oneHourFromNow,
} from "../utils/date";
import appAssert from "../utils/appAssert";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "../constants/http";
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from "../utils/jwt";
import { getFromEmail, getToEmail, transporter } from "../utils/sendMail";
import { APP_ORIGIN } from "../constants/env";
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} from "../utils/emailTemplate";
import { get } from "mongoose";

export type ICreateAccount = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: ICreateAccount) => {
  // verify if the email exists
  // if it does, return an error
  // if it doesn't, create the account
  const existingUser = await UserModel.exists({ email: data.email });

  appAssert(!existingUser, CONFLICT, "User already exists");

  //   create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  const userId = user._id;

  //   create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  const url = `${APP_ORIGIN}/email/verify/${verificationCode._id}`;
  //   send verification email

  const mailOptions = {
    from: getFromEmail(),
    to: getToEmail(user.email),
    ...getVerifyEmailTemplate(url),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: ", error);
    } else {
      console.log("Verification email sent: ", info.response);
    }
  });

  // create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });

  //   sign access token & refresh token
  const refreshToken = signToken(
    { sessionId: session._id },
    refreshTokenSignOptions
  );

  const accessToken = signToken({ userId, sessionId: session._id });

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

type ILoginUser = {
  email: string;
  password: string;
  userAgent?: string;
};

export const loginUser = async ({ email, password, userAgent }: ILoginUser) => {
  // get user by email
  const user = await UserModel.findOne({ email });
  appAssert(user, UNAUTHORIZED, "Invalid email or password");
  // validate password
  const isValid = await user.comparePassword(password);
  appAssert(isValid, UNAUTHORIZED, "Invalid email or password");

  const userId = user._id;
  // create session
  const session = await SessionModel.create({
    userId,
    userAgent,
  });
  const sessionInfo = {
    sessionId: session._id,
  };
  // sign access token & refresh token

  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  const accessToken = signToken({ ...sessionInfo, userId: user._id });
  // return user
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");
  const now = Date.now();
  const session = await SessionModel.findById(payload.sessionId);
  appAssert(
    session && session.expiresAt.getTime() > now,
    UNAUTHORIZED,
    "Session expired"
  );
  //   refresh session if it expires in the next 24 hours
  const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;

  if (sessionNeedsRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }
  const newRefreshToken = sessionNeedsRefresh
    ? signToken({ sessionId: session._id }, refreshTokenSignOptions)
    : undefined;
  const accessToken = signToken({
    userId: session.userId,
    sessionId: session._id,
  });

  return {
    accessToken,
    newRefreshToken,
  };
};

export const verifyEmail = async (code: string) => {
  // get the verification code
  const validCode = await VerificationCodeModel.findOne({
    _id: code,
    type: VerificationCodeType.EmailVerification,
    expiresAt: { $gt: new Date() },
  });
  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");
  // get the user by id
  const updatedUser = await UserModel.findByIdAndUpdate(
    validCode.userId,
    {
      verified: true,
    },
    { new: true }
  );
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to verify email");
  await validCode.deleteOne();
  // return the user
  return {
    user: updatedUser.omitPassword(),
  };
};

export const sendPasswordResetEmail = async (email: string) => {
  // get the user by email
  const user = await UserModel.findOne({ email });
  appAssert(user, NOT_FOUND, "User not found");

  const fiveMinutesAgo = FIVE_MINUTES_AGO();
  const count = await VerificationCodeModel.countDocuments({
    userId: user._id,
    expiresAt: { $gt: fiveMinutesAgo },
  });
  appAssert(
    count <= 1,
    TOO_MANY_REQUESTS,
    "Too many reset requests, please try again later"
  );

  const expiresAt = oneHourFromNow();

  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.PasswordReset,
    expiresAt,
  });

  const url = `${APP_ORIGIN}/password/reset?code=${
    verificationCode._id
  }&exp=${expiresAt.getTime()}`;

  const mailOptions = {
    from: getFromEmail(),
    to: getToEmail(user.email),
    ...getPasswordResetTemplate(url),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      appAssert(
        info.messageId,
        INTERNAL_SERVER_ERROR,
        `${error.name}: ${error.message}`
      );
    } else {
      return {
        url,
        emailId: info.messageId,
      };
    }
  });
};
