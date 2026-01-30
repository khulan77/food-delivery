import { model, models, ObjectId, Schema } from "mongoose";

type FoodId = {
  foodName: String;
  price: Number;
  image: String;
  ingredients: String;
  category: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const foodId = new Schema<FoodId>({
  foodName: { type: String, required: true },
});

export const FoodModel = models["Food"] || model("Food", foodId);
