import { Request, Response } from "express";
import { UserModel } from "../../models";
import { verfiyUserEmail } from "../../utils/mail-utils";
import crypto from "crypto";

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 1000 * 60 * 10;
    await user.save();

    const resetLink = `${process.env.BASE_URL}/api/users/reset-password?token=${resetToken}`;
    await verfiyUserEmail(user.email, resetLink);

    res.json({ message: "Reset password email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
