import { Request, Response } from "express";
export const verifyUser = async (req: Request, res: Response) => {
  console.log(req.query);
};
