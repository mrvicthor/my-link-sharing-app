import { Router } from "express";
import {
  createLinkHandler,
  getUserHandler,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", getUserHandler);
userRoutes.post("/create-link", createLinkHandler);

export default userRoutes;
