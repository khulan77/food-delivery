import { model, models, ObjectId, Schema } from "mongoose";

type FoodGategory = {
  _id: ObjectId;
  categoryName: String;
  createdAt: Date;
  updatedAt: Date;
};

export const foodGategorySchema = new Schema<FoodGategory>({
  categoryName: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export const FoodGategoryModel =
  models["Gategory"] || model<FoodGategory>("Gategory", foodGategorySchema);
