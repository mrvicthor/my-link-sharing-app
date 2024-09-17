import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../models/user.model";
import { ISession } from "../models/session.model";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";

export type AccessTokenPayload = {
  userId: IUser["_id"];
  sessionId: ISession["_id"];
};

export type RefreshTokenPayload = {
  sessionId: ISession["_id"];
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

export const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET,
};
export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, signOpts);
};
