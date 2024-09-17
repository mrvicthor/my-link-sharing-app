import { CookieOptions, Response } from "express";
import { thirtyDaysFromNow, fifteenMinutesFromNow } from "./date";

const secure = process.env.NODE_ENV !== "development";
const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure,
  sameSite: "strict",
};

const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaultCookieOptions,
  expires: fifteenMinutesFromNow(),
});

const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaultCookieOptions,
  expires: thirtyDaysFromNow(),
  path: "/auth/refresh",
});

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
