import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../../models";
export const singUpController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, email);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(500).send({ message: "Sign in Failed" });
  }
};
