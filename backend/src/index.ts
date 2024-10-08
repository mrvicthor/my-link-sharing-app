import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db";
import { PORT, NODE_ENV, APP_ORIGIN } from "./constants/env";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.route";
import { OK } from "./constants/http";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.get("/", (req, res, next) => {
  return res.status(OK).json({ status: "healthy" });
});

app.use("/auth", authRoutes);
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);

app.use(errorHandler);
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
  await connectToDatabase();
});
