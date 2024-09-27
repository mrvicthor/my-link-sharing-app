import mongoose from "mongoose";

interface ILink {
  _id: mongoose.Types.ObjectId;
  title: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  owner: mongoose.Types.ObjectId;
}

const linkSchema = new mongoose.Schema<ILink>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const LinkModel = mongoose.model<ILink>("Link", linkSchema);
