import { Router } from "express";
import {
  createLinkHandler,
  createProfileHandler,
  deleteLinkHandler,
  getLinksHandler,
  getUserHandler,
  updateLinkHandler,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", getUserHandler);
userRoutes.post("/create-link", createLinkHandler);
userRoutes.get("/links", getLinksHandler);
userRoutes.post("/create-profile", createProfileHandler);
userRoutes.delete("/links/:id", deleteLinkHandler);
userRoutes.put("/links/:id", updateLinkHandler);

export default userRoutes;
