import { Request, Response, NextFunction } from "express";
import ValidationError from "../exceptions/ValidationError";

class PlatformMiddleware {
    async checkPlatform(req: Request, res: Response, next: NextFunction) {
        switch (req.get("X-platform")) {
        case "web":
            req.body.platform = "web";
            next();
            break;
        case "android":
            req.body.platform = "android";
            next();
            break;
        case "ios":
            req.body.platform = "ios";
            next();
            break;
        default:
            next(new ValidationError("Invalid platform"));
        }
    }
}

export default new PlatformMiddleware();
