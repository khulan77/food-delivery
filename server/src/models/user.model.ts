import { model, models, ObjectId, Schema } from "mongoose";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type User = {
  _id: ObjectId;
  email: string;
  password: string;
  phoneNUmber?: string;
  address?: string;
  role: UserRole;
  orderedFoods?: ObjectId[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNUmber: { type: String },
    address: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    orderedFoods: [{ type: Schema.Types.ObjectId, ref: "Foods" }],
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const UserModel = models["Users"] || model("Users", userSchema);
