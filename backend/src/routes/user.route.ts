import { Router } from "express";
import multer from "multer";
import {
  createLinkHandler,
  createProfileHandler,
  getLinksHandler,
  getUserHandler,
} from "../controllers/user.controller";

const userRoutes = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

userRoutes.get("/", getUserHandler);
userRoutes.post("/create-link", createLinkHandler);
userRoutes.get("/links", getLinksHandler);
userRoutes.post(
  "/create-profile",
  upload.single("image"),
  createProfileHandler
);

export default userRoutes;
