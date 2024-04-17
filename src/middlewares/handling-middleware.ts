import { Request, Response, NextFunction } from "express";
// ----- Error ------
import CustomHttpError from "../exceptions/CustomHttpError";

const handlingMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err);
    const statusCode = err instanceof CustomHttpError ? err.statusCode : 500;
    res.status(statusCode).json({ value: null, message: err.message, status: "error" });
};

export default handlingMiddleware;