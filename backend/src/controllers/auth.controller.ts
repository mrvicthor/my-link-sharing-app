import {
  registerSchema,
  loginSchema,
  verificationSchema,
  emailSchema,
  resetPasswordSchema,
} from "./auth.schemas";
import catchErrors from "../utils/catchErrors";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
  resetPassword,
  sendPasswordResetEmail,
  verifyEmail,
} from "../services/auth.service";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import {
  setAuthCookies,
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
} from "../utils/cookies";
import { verifyToken } from "../utils/jwt";
import SessionModel from "../models/session.model";
import appAssert from "../utils/appAssert";
import UserModel from "../models/user.model";

export const registerHandler = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await createAccount(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { accessToken, refreshToken } = await loginUser(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "Logged in successfully" });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  const { payload } = verifyToken(accessToken || "");
  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }
  console.log("logout session", payload?.sessionId);
  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Logged out successfully" });
});

export const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

  const { accessToken, newRefreshToken } = await refreshUserAccessToken(
    refreshToken
  );
  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }
  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({ message: "Access token refreshed" });
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
  const verificationCode = verificationSchema.parse(req.params.code);

  await verifyEmail(verificationCode);
  return res.status(OK).json({ message: "Email verified successfully" });
});

export const sendPasswordResetHandler = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email);
  await sendPasswordResetEmail(email);
  return res.status(OK).json({ message: "Password reset email sent" });
});

export const resetPasswordHandler = catchErrors(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body);
  await resetPassword(request);
  //   clears auth cookies, requiring user to signin again with the new password
  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Password reset successfully" });
});

export const authStatusHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  if (!accessToken) {
    return res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
  }
  const { payload } = verifyToken(accessToken || "");
  const user = await UserModel.findById(payload?.userId);
  return res.status(OK).json({ authorized: user ? true : false });
});
