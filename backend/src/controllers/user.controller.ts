import mongoose from "mongoose";
import { CREATED, NOT_FOUND, OK } from "../constants/http";
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
  const {
    "First name": firstName,
    "Last name": lastName,
    imageUrl,
  } = createProfileSchema.parse(req.body);
  let image = null;
  const imageStringCheck = "https://res.cloudinary.com/mrvicthor/image/upload/";
  if (imageUrl && imageUrl.includes(imageStringCheck) === false) {
    const base64Data = imageUrl.split(",")[1];
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Data}`,
      {
        folder: "link-sharing",
      }
    );

    image = result.secure_url;
  } else {
    image = imageUrl;
  }
  const userId = req.userId;

  await createProfile({
    firstName,
    lastName,
    userId,
    image: image as string,
  });
  return res.status(OK).json({ message: "Profile created successfully" });
});

export const deleteLinkHandler = catchErrors(async (req, res) => {
  const linkId = req.params.id;
  const deleted = await LinkModel.findOneAndDelete({
    _id: linkId,
    owner: req.userId,
  });

  await UserModel.updateOne(
    {
      _id: req.userId,
    },
    {
      $pull: {
        links: { _id: linkId },
      },
    }
  );
  appAssert(deleted, NOT_FOUND, "Link not found");
  return res.status(OK).json({ message: "Link deleted successfully" });
});

export const updateLinkHandler = catchErrors(async (req, res) => {
  const linkId = req.params.id;
  const updatedLink = req.body;
  const updatedLinkDoc = await LinkModel.findByIdAndUpdate(
    linkId,
    updatedLink,
    { new: true, runValidators: true }
  );
  if (!updatedLinkDoc) {
    return res.status(NOT_FOUND).json({ message: "Link not found" });
  }
  const userUpdatedresult = await UserModel.updateOne(
    {
      _id: req.userId,
      "links._id": linkId,
    },
    {
      $set: {
        "links.$.title": updatedLink.title,
        "links.$.url": updatedLink.url,
      },
    }
  );
  if (userUpdatedresult.matchedCount === 0) {
    return res
      .status(NOT_FOUND)
      .json({ error: "User not found or Link not associated with user" });
  }

  return res
    .status(OK)
    .json({ message: "Link updated successfully", link: updatedLinkDoc });
});
