import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models";

export const singInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(403).send({ message: "Email not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("SIGN IN ERROR:", error);
    res.status(500).send({ message: "Sign in Failed" });
  }
};
