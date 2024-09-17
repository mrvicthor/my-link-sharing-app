import mongoose from "mongoose";
import { thirtyDaysFromNow } from "../utils/date";

export interface ISession extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  createdAt: Date;
  expiresAt: Date;
}

const sessionSchema = new mongoose.Schema<ISession>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    index: true,
  },
  userAgent: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: thirtyDaysFromNow(),
  },
});

const SessionModel = mongoose.model<ISession>(
  "Session",
  sessionSchema,
  "sessions"
);

export default SessionModel;
