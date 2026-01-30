import { model, models, ObjectId, Schema } from "mongoose";

type FoodGategory = {
  _id: ObjectId;
  catygoryName: String;
  createdAt: Date;
  updatedAt: Date;
};

export const foodGategorySchema = new Schema<FoodGategory>({
  catygoryName: { type: String, required: true },
});

export const FoodGategoryModel =
  models["Gategory"] || model<FoodGategory>("Gategory", foodGategorySchema);
