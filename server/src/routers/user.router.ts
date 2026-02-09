import { Router } from "express";
import { singUpController } from "../controllers/Authentication";
import { verifyUser } from "../controllers/Authentication/verify-user.controller";
import { resetPassword } from "../controllers/Authentication";

const router = Router();

router.post("/users/sign-up", singUpController);
router.get("/users/verify", verifyUser);
router.post("./users/resett-password", resetPassword);
export default router;
