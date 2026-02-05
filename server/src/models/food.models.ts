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

export const foodId = new Schema<FoodId>(
  {
    foodName: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const FoodModel = models["Food"] || model("Food", foodId);
