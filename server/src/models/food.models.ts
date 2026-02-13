import { Schema, model, models, Types } from "mongoose";

export type FoodType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const FoodSchema = new Schema<FoodType>(
  {
    foodName: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "FoodCategory",
      required: true,
    },
  },
  { timestamps: true },
);

export const Food = models.Food || model<FoodType>("Food", FoodSchema);
