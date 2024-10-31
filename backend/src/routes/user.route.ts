import { Router } from "express";
import {
  createLinkHandler,
  createProfileHandler,
  deleteLinkHandler,
  getLinksHandler,
  getPreviewHandler,
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
userRoutes.get("/preview/:id", getPreviewHandler);

export default userRoutes;
