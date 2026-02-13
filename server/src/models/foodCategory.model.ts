import { Schema, model, models } from "mongoose";

export type FoodCategoryType = {
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

const FoodCategorySchema = new Schema<FoodCategoryType>(
  {
    categoryName: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const FoodCategory =
  models.FoodCategory ||
  model<FoodCategoryType>("FoodCategory", FoodCategorySchema);
