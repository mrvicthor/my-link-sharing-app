import { RequestHandler } from "express";
import { Types } from "mongoose";
import appAssert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";
import { verifyToken } from "../utils/jwt";

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Unauthorized",
    AppErrorCode.InvalidAccessToken
  );

  const { payload, error } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCode.InvalidAccessToken
  );

  req.userId = new Types.ObjectId(payload.userId as string);
  req.sessionId = new Types.ObjectId(payload.sessionId as string);
  next();
};

export default authenticate;
