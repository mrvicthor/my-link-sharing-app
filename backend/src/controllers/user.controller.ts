import mongoose from "mongoose";
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "../constants/http";
import UserModel from "../models/user.model";
import { createLink } from "../services/link.service";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { LinkModel } from "../models/link.model";
import { createProfileSchema } from "./auth.schemas";
import { createProfile } from "../services/auth.service";
import cloudinary from "../config/cloudinary";

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "User not found");
  return res.status(OK).json(user.omitPassword());
});

export const createLinkHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "User not found");
  const userId = new mongoose.Types.ObjectId(user._id as string);
  const links = req.body;
  const { newLinks, updatedUser } = await createLink({ userId, links });
  return res.status(CREATED).json({
    message: "Link created successfully",
    newLinks,
    user: updatedUser.omitPassword(),
  });
});

export const getLinksHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "User not found");
  const links = await LinkModel.find({ owner: req.userId }).lean();
  return res.status(OK).json(links);
});

export const createProfileHandler = catchErrors(async (req, res) => {
  const { firstName, lastName, image } = createProfileSchema.parse(req.body);
  let imageUrl = null;
  if (image) {
    const base64Data = image.split(",")[1];
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Data}`,
      {
        folder: "link-sharing",
      }
    );

    console.log(result.secure_url, "vicky");
    imageUrl = result.secure_url;
  }
  const userId = req.userId;

  await createProfile({
    firstName,
    lastName,
    userId,
    image: imageUrl as string,
  });
  return res.status(OK).json({ message: "Profile created successfully" });
});
