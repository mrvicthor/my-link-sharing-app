import VerificationCodeType from "../constants/verificationCodeTypes";
import UserModel from "../models/user.model";
import SessionModel from "../models/session.model";
import jwt from "jsonwebtoken";
import VerificationCodeModel from "../models/verificationCode.model";
import { oneYearFromNow } from "../utils/date";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import appAssert from "../utils/appAssert";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import { refreshTokenSignOptions, signToken } from "../utils/jwt";

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

  //   send verification email

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
