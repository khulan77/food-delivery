import { model, models, ObjectId, Schema } from "mongoose";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type User = {
  _id: ObjectId;
  email: String;
  password: String;
  phoneNUmber: String;
  address: String;
  role: UserRole;
  orderedFoods: ObjectId[];
  ttl: Date;
  isVerified: Boolean;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<User>(
  {
    email: { type: String, requied: true },
    password: { type: String, required: true },
    phoneNUmber: { type: String, required: false },
    address: { type: String, required: false },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
      required: true,
    },
    isVerified: { type: Boolean, default: false, required: false },
    ttl: { type: Date, required: true },
  },
  { timestamps: true },
);
userSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 });

export const UserModel = models["Users"] || model("Users", userSchema);
