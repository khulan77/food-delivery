import { Router } from "express";
import { singUpController } from "../controllers/Authentication";
import { singInController } from "../controllers/Authentication";
import { verifyUser } from "../controllers/Authentication/verify-user.controller";
import { confirmResetPass } from "../controllers/Authentication";
import { updateResetPassword } from "../controllers/Authentication";

const router = Router();

router.post("/users/sign-up", singUpController);
router.get("/users/verify", verifyUser);
router.post("/users/reset-password", confirmResetPass);
router.get("/users/verify-reset-password", updateResetPassword);
router.post("/users/sign-in", singInController);
router.post("/users/reset-password-request", confirmResetPass);

export default router;
