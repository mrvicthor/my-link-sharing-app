import { Router } from "express";
import multer from "multer";
import {
  registerHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  verifyEmailHandler,
  sendPasswordResetHandler,
  resetPasswordHandler,
  createProfileHandler,
} from "../controllers/auth.controller";

const authRoutes = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);
authRoutes.post("/password/forgot", sendPasswordResetHandler);
authRoutes.post("/password/reset", resetPasswordHandler);
authRoutes.post(
  "/create-profile",
  upload.single("image"),
  createProfileHandler
);

export default authRoutes;
