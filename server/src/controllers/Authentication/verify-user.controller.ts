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

    // // 🔹 3. User олох
    // const user = await UserModel.findOne({ email: decoded.email });

    // if (!user) {
    //   res.status(404).json({ message: "User not found" });
    //   return;
    // }

    // // 🔹 4. Аль хэдийн verify болсон эсэх
    // if (user.isVerified) {
    //   res.status(200).json({ message: "User already verified" });
    //   return;
    // }

    // // 🔹 5. Verify хийх
    // user.isVerified = true;
    // await user.save();

    // res.status(200).json({
    //   message: "Email verified successfully",
    //   data: {
    //     _id: user._id,
    //     email: user.email,
    //     isVerified: user.isVerified,
    //   },
    // });
  } catch (error: any) {
    res.status(400).json({
      message: "Verification failed",
      error: error.message,
    });
  }
};
