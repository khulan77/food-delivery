import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verfiyUserEmail } from "../../utils/mail-utils";
import { UserModel } from "../../models";

export const singUpController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: true,
        message: "hereglegch ali hediin burtgegdsen baina",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: 600,
    });

    await verfiyUserEmail(
      email,
      `${process.env.BACKEND_API}/users/verify-users?token=${token}`,
    );
    res.status(201).json({
      success: true,
      message: "batalgaajuulah link email ruuu cin ywuulsan",
      data: newUser,
    });
    return;
  } catch (error) {
    console.log("SIGNUP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "serveriin aldaa",
      error: error instanceof Error ? error.message : error,
    });
  }
};
