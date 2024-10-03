import mongoose from "mongoose";
import { LinkModel } from "../models/link.model";
import UserModel from "../models/user.model";
import { ILink } from "../models/link.model";

type LinkProps = {
  title: string;
  url: string;
};
type Link = {
  links: LinkProps[];
  userId: mongoose.Types.ObjectId;
};

export const createLink = async ({ userId, links }: Link) => {
  const newLinks = links.map((link) => ({
    ...link,
    owner: userId,
  }));
  const createdLinks = await LinkModel.insertMany(newLinks);

  const linkProperties = createdLinks.map((link) => ({
    title: link.title,
    url: link.url,
    owner: link.owner,
    _id: link._id,
  }));
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        links: { $each: linkProperties },
      },
    },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    // If user update fails, delete the created link to maintain consistency
    await LinkModel.deleteMany({
      _id: { $in: createdLinks.map((link) => link._id) },
    });
    throw new Error("Failed to update user with new link");
  }
  return { newLinks, updatedUser };
};
