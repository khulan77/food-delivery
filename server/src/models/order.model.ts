import { model, models, ObjectId, Schema } from "mongoose";

type FoodOrder = {
  _id: ObjectId;
  user: ObjectId;
  totalPrice: Number;
  //   foodOrderItems: FoodOrderItem[]
  //   status: FoodOrderStatusEnum
  createdAt: Date;
  updatedAt: Date;
};

const FoodOrderSchema = new Schema<FoodOrder>({});

export const foodOrderModel =
  models["FoodOrder"] || model("FoodOrder", FoodOrderSchema);
