import mongoose, { Schema } from "mongoose";
import { comparePassword, hashPassword } from "../utils/bcrypt";
export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  links: mongoose.Types.ObjectId[];
  comparePassword: (password: string) => Promise<boolean>;
  omitPassword: () => Pick<
    IUser,
    "_id" | "email" | "verified" | "createdAt" | "updatedAt" | "__v" | "links"
  >;
}
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    links: [
      {
        type: Schema.Types.ObjectId,
        ref: "Link",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await hashPassword(this.password);
  next();
});

userSchema.methods.comparePassword = async function (value: string) {
  return comparePassword(value, this.password);
};

userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
