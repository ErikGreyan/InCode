import { Router } from "express";
// ------ Middlewares ------
import userMiddleware from "../middlewares/user-middlewares";
import platformMiddleware from "../middlewares/platform-middleware";
// ------ Controller ------
import authController from "../controllers/auth-controller";
const router = Router();

router.post(
    "/register",
    userMiddleware.validateUserRegister,
    platformMiddleware.checkPlatform,
    authController.register
);

router.post(
    "/login",
    userMiddleware.validateUserLogin,
    platformMiddleware.checkPlatform,
    authController.login
);

router.delete(
    "/logout",
    platformMiddleware.checkPlatform,
    authController.logout
);

export default router;