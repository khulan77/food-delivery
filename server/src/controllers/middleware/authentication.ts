import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UserModel } from "../../models";

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Token baihgui baina" });
    }

    const token = authToken.split(" ")[1];

    const decoded = verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: string;
      verified?: boolean;
    };

    if (!decoded.userId) {
      return res.status(401).send({ message: "Token buruu" });
    }

    const existingUser = await UserModel.findById(decoded.userId);
    if (!existingUser) {
      return res.status(401).send({ message: "User oldsongui" });
    }

    if (!existingUser.isVerified) {
      return res.status(403).send({ message: "Email verify hiigeegui" });
    }

    (req as any).user = {
      _id: existingUser._id,
      role: existingUser.role,
    };

    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Token hugatsaa duussan esvel buruu" });
  }
};
