import mongoose from "mongoose";
import { LinkModel } from "../models/link.model";
import UserModel from "../models/user.model";

type Link = {
  title: string;
  url: string;
  userId: mongoose.Types.ObjectId;
};

export const createLink = async ({ title, url, userId }: Link) => {
  const link = await LinkModel.create({
    owner: userId,
    title,
    url,
  });
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      $push: { links: link.omitIrrelevantProperties() },
    },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    // If user update fails, delete the created link to maintain consistency
    await LinkModel.findByIdAndDelete(link._id);
    throw new Error("Failed to update user with new link");
  }
  return { link, updatedUser };
};
