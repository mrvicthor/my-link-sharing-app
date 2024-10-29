import mongoose, { Schema } from "mongoose";
import { comparePassword, hashPassword } from "../utils/bcrypt";

interface ILink {
  _id: Schema.Types.ObjectId;
  title: string;
  url: string;
}

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  verified: boolean;
  firstName: string;
  lastName: string;
  image: {
    data: Buffer;
    contentType: string;
  };
  profileCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  links: ILink[];
  __v?: number;
  comparePassword: (password: string) => Promise<boolean>;
  omitPassword: () => Pick<
    IUser,
    | "_id"
    | "email"
    | "verified"
    | "firstName"
    | "lastName"
    | "image"
    | "profileCompleted"
    | "createdAt"
    | "updatedAt"
    | "__v"
    | "links"
  >;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    links: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Link",
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
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
