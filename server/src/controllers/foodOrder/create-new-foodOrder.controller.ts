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
        success: false, // ✅ засав
        message: "hereglegch ali hediin burtgegdsen baina",
      });
    }

    // 🔐 Password hash (илүү secure round)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      isVerified: false, // ✅ verify логикт хэрэгтэй
    });

    // 🎟 EMAIL VERIFY TOKEN (тусдаа secret ашиглах нь зөв)
    const verifyToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_VERIFY_SECRET!,
      { expiresIn: "10m" },
    );

    await verfiyUserEmail(
      email,
      `${process.env.BACKEND_API}/users/verify-users?token=${verifyToken}`,
    );

    // 🔑 LOGIN TOKEN үүсгээд frontend-д өгч болно (гэхдээ verify=false)
    const loginToken = jwt.sign(
      { userId: newUser._id, role: newUser.role, verified: false },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );

    res.status(201).json({
      success: true,
      message: "batalgaajuulah link email ruuu cin ywuulsan",
      token: loginToken, // 🆕 нэмэгдсэн
      data: {
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        isVerified: newUser.isVerified,
      },
    });
    return;
  } catch (error) {
    console.log("🔥 SIGNUP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "serveriin aldaa",
      error: error instanceof Error ? error.message : error,
    });
  }
};
