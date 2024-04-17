import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
// ------ Error ------
import ValidationError from "../exceptions/ValidationError";
// ------ Dto ------
import { UserLogin } from "../dto/user-login.dto";
import { UserRegister } from "../dto/user-register.dto";

class UserMiddleware {
    async validateUserRegister(req: Request, res: Response, next: NextFunction) {
        const user = Object.assign(new UserRegister(), req.body);

        const errors = await validate(user);

        if (errors.length > 0) {
            const error: string = errors
                .map((item) => JSON.stringify(item.constraints))
                .join("");
            next(new ValidationError(error));
            return;
        }

        console.log("User register data is validated");
        next();
    }

    async validateUserLogin(req: Request, res: Response, next: NextFunction) {
        const user = Object.assign(new UserLogin(), req.body);

        const errors = await validate(user);
        if (errors.length > 0) {
            const error: string = errors
                .map((item) => JSON.stringify(item.constraints))
                .join("");
            next(new ValidationError(error));
            return;
        }

        console.log("user is validated");

        next();
    }
}

export default new UserMiddleware();