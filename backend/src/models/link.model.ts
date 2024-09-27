import mongoose, { Types } from "mongoose";

interface ILink {
  _id: Types.ObjectId;
  title: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  owner: Types.ObjectId;
  omitIrrelevantProperties: () => Pick<
    ILink,
    "_id" | "title" | "url" | "owner"
  >;
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

linkSchema.methods.omitIrrelevantProperties = function () {
  const link = this.toObject();
  delete link.createdAt;
  delete link.updatedAt;
  return link;
};

export const LinkModel = mongoose.model<ILink>("Link", linkSchema);
