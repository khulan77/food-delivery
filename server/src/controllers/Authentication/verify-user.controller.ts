import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models";
import { verfiyUserEmail } from "../../utils/mail-utils";

export const verifyUser = async (req: Request, res: Response) => {
  try {
    // 🔹 1. URL query-с token авах
    const { token, email, password, userName, phoneNumber, address } = req.body;

    const newUser = await UserModel.create({
      userName,
      email,
      password,
      phoneNumber,
      address,
    });
    const decoded = jwt.sign({ _id: newUser._id }, "hi", token);
    await verfiyUserEmail(
      email,
      `${process.env.BACKEND_API}/verify-user?token=${token}`,
    );
    res.status(400).send({ message: "sent", user: newUser, token });
  } catch (error: any) {
    res.status(400).json({
      message: "Verification failed",
      error: error.message,
    });
  }
};
