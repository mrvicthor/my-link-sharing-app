import { Router } from "express";
import {
  createLinkHandler,
  createProfileHandler,
  getLinksHandler,
  getUserHandler,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", getUserHandler);
userRoutes.post("/create-link", createLinkHandler);
userRoutes.get("/links", getLinksHandler);
userRoutes.post("/create-profile", createProfileHandler);

export default userRoutes;
