import { Router } from "express";
import { singUpController } from "../controllers/users/sign-in.controller";

const router = Router();

router.post("/users/sign-up", singUpController);
export default router;
