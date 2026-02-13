import { Request, Response } from "express";
import { Food } from "../../models";
import { FoodCategory } from "../../models";

export const createFood = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients, category } = req.body;

    const categoryExists = await FoodCategory.findById(category);
    if (!categoryExists) {
      return res.status(400).json({
        message: "Category олдсонгүй",
      });
    }

    const food = await Food.create({
      foodName,
      price,
      image,
      ingredients,
      category,
    });

    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({ message: "Food үүсгэхэд алдаа гарлаа", error });
  }
};

export const getAllFood = async (_req: Request, res: Response) => {
  try {
    const foods = await Food.find().populate("category", "categoryName");
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const food = await Food.findById(req.params.foodId).populate(
      "category",
      "categoryName",
    );

    if (!food) {
      return res.status(404).json({ message: "Food олдсонгүй" });
    }

    res.json(food);
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};

export const updateFood = async (req: Request, res: Response) => {
  try {
    const updated = await Food.findByIdAndUpdate(req.params.foodId, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Food олдсонгүй" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Шинэчлэхэд алдаа гарлаа", error });
  }
};

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const deleted = await Food.findByIdAndDelete(req.params.foodId);

    if (!deleted) {
      return res.status(404).json({ message: "Food олдсонгүй" });
    }

    res.json({ message: "Амжилттай устгалаа" });
  } catch (error) {
    res.status(400).json({ message: "Устгахад алдаа гарлаа", error });
  }
};
