import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models";
export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Token oldsongvi" });
    }

    const decodedToken = jwt.verify(
      token as string,
      process.env.JWT_SECRET!,
    ) as {
      email: string;
    };

    const verifiedUser = await UserModel.findOneAndUpdate(
      { email: decodedToken.email },
      { isVerified: true },
      { new: true },
    ).select("-password");

    if (!verifiedUser) {
      return res.status(404).json({ message: "Hereglegch oldsongvi." });
    }

    return res.status(200).json({
      success: true,
      message: "Amjilttai batalgaajlaa",
      data: verifiedUser,
    });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(400)
        .json({ message: "Batalgaajuulah hugatsaaa duussan." });
    }
    return res
      .status(500)
      .json({ message: "Serveriin aldaa", error: error.message });
  }
};
