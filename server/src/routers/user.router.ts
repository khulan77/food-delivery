import { Router } from "express";
import { singUpController } from "../controllers/Authentication";
import { singInController } from "../controllers/Authentication";
import { verifyUser } from "../controllers/Authentication/verify-user.controller";
import { resetPassword } from "../controllers/Authentication";
import { updateResetPassword } from "../controllers/Authentication";

const router = Router();

router.post("/users/sign-up", singUpController);
router.get("/users/verify", verifyUser);
router.post("/users/reset-password", resetPassword);
router.post("/users/verify-reset-password", updateResetPassword);
// router.get("/users/refresh", singInController);
router.post("/users/sign-in", singInController);
router.post("/users/reset-password-request", resetPassword);

export default router;
