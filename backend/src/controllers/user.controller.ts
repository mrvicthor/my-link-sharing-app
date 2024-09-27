import mongoose from "mongoose";
import { CREATED, NOT_FOUND, OK } from "../constants/http";
import UserModel from "../models/user.model";
import { createLink } from "../services/link.service";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "User not found");
  return res.status(OK).json(user.omitPassword());
});

export const createLinkHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "User not found");
  const { title, url } = req.body;
  const userId = new mongoose.Types.ObjectId(user._id as string);
  const { link, updatedUser } = await createLink({ userId, title, url });
  return res
    .status(CREATED)
    .json({
      message: "Link created successfully",
      link,
      user: updatedUser.omitPassword(),
    });
});
