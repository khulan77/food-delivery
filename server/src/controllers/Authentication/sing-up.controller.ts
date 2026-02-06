import { Request, Response } from "express";
import bcrypt, { hashSync } from "bcrypt";
import jwt, { verify } from "jsonwebtoken";
import { verfiyUserEmail } from "../../utils/mail-utils";
import { UserModel } from "../../models";

export const singUpController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Hereglegch ali hediin burtgegdsen baina",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      isVerified: false,
    });

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "10m",
    });

    const verificationLink = `${process.env.BACKEND_API}/auth/verify-users?token=${token}`;
    await verfiyUserEmail(email, verificationLink);

    res.status(201).json({
      success: true,
      message: "Batalgaajuulah link emailruu ilgeelee.",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res
      .status(500)
      .json({ success: false, message: "Serweriiin aldaa garlaa" });
  }
};
