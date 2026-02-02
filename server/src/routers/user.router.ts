import { Router } from "express";
// import { singInController } from "../controllers/users/sign-in.controller";
import { singUpController } from "../controllers";
import { verifyUser } from "../controllers/users/verify-user.controller";

const router = Router();

router.post("/users/sign-up", singUpController);
router.get("/users/sign-up", verifyUser);
export default router;
