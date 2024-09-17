import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db";
import { PORT, NODE_ENV, APP_ORIGIN } from "./constants/env";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.route";
import { OK } from "./constants/http";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
// app.get(
//   "/",
//   catchErrors(async (req, res, next) => {
//     throw new Error("This is a test error");
//     return res.status(200).json({ status: "healthy" });
//   })
// );
app.use("/auth", authRoutes);
app.use(errorHandler);
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
  await connectToDatabase();
});
