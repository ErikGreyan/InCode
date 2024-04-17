import { Request, Response, NextFunction } from "express";
// ------ Service ------
import authService from "../services/auth-service";
// ------ Error ------
import ServerError from "../exceptions/ServerError";
// ------ Token ------
import tokenService from "../services/token-service";

class UserController {
    async register(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { name, email, password } = req.body;
            const userData = await authService.register({ name, email, password });
            return res.status(201).json({
                value: userData,
                message: "User successfully registered",
                status: "success",
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { email, password } = req.body;
            const userData = await authService.login({ email, password });
            return res.status(201).json({
                value: userData,
                message: "User successfully login",
                status: "success",
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async logout(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { refreshToken } = req.body;
            await tokenService.logout(refreshToken);
            return res.status(204).json({
                value: null,
                message: "User successfully logged out",
                status: "success",
            });
        } catch (err) {
            console.log(err);
            next(new ServerError("Internal Server Error"));
        }
    }
}

export default new UserController();