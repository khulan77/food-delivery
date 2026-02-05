import { ObjectId, Schema, model, models } from "mongoose";

export enum FoodOrderStatusEnum {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
}

type foodOrder = {
  _id: ObjectId;
  user: ObjectId;
  totalPrice: Number;
  status: FoodOrderStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

const FoodOrderItem = new Schema<foodOrder>(
  {
    totalPrice: { type: String, required: true },
    createdAt: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      default: FoodOrderStatusEnum.PENDING,
      required: true,
    },
    updatedAt: { type: Date, required: true },
  },
  { timestamps: true },
);
export const FoodOrder = models["Orders"] || model("Orders", FoodOrderItem);
