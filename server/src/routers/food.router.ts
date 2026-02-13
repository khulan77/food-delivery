import { Router } from "express";
import {
  createFood,
  getAllFood,
  getFoodById,
  updateFood,
  deleteFood,
} from "../controllers/food/food.controller";

const router = Router();

router.get("/food", getAllFood);
router.get("/food/:foodId", getFoodById);
router.post("/food/create-food", createFood);
router.patch("/food/:foodId", updateFood);
router.delete("/food/:foodId", deleteFood);

export default router;
