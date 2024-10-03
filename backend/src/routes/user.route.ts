import { Router } from "express";
import {
  createLinkHandler,
  getLinksHandler,
  getUserHandler,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", getUserHandler);
userRoutes.post("/create-link", createLinkHandler);
userRoutes.get("/links", getLinksHandler);

export default userRoutes;
