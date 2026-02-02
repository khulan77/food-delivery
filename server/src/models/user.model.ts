import { model, models, ObjectId, Schema } from "mongoose";

type User = {
  _id: ObjectId;
  email: String;
  password: String;
  phoneNUmber: String;
  address: String;
  orderedFoods: ObjectId[];
  ttl: Date;
  isVerified: Boolean;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<User>({
  email: { type: String, requied: true },
  password: { type: String, required: true },
});

export const UserModel = models["Users"] || model("Users", userSchema);
