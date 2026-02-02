import { Request, Response } from "express";
import bcrypt, { hashSync } from "bcrypt";
import jwt, { verify } from "jsonwebtoken";
import { verfiyUserEmail } from "../../utils/mail-utils";

import { UserModel } from "../../models";

export const singUpController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // const hashedPassword = bcrypt.hashSync(password, 8);
    const token = jwt.sign({ _id: "567890987654ty" }, "hello", {
      expiresIn: "2h",
    });
    // const decoded = jwt.decode(
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Njc4OTA5ODc2NTR0eSIsImlhdCI6MTc3MDAwMzMwNSwiZXhwIjoxNzcwMDEwNTA1fQ.mCs02d2qnXy17XnjijzjixmK2Jf9yKuMan0sC2km4vc",
    // );
    // const verified = jwt.verify(
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Njc4OTA5ODc2NTR0eSIsImlhdCI6MTc3MDAwMzMwNSwiZXhwIjoxNzcwMDEwNTA1fQ.mCs02d2qnXy17XnjijzjixmK2Jf9yKuMan0sC2km4vc",
    //   "hello",
    // );
    await verfiyUserEmail(
      email,
      `${process.env.BACKEND_API}/users/verify-user?token+${token}`,
    );
    res.status(200).send({});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error creating user", error: error });
  }
};
