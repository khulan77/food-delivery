import { Router } from "express";
import { singUpController } from "../controllers/Authentication";
import { verifyUser } from "../controllers/Authentication/verify-user.controller";

const router = Router();

router.post("/users/sign-up", singUpController);
router.get("/users/verify", verifyUser);
export default router;
