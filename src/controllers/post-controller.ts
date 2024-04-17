import { Request, Response, NextFunction } from "express";
// ------ Service ------
import postService from "../services/post-service";
// ------ Error ------
import NotFoundError from "../exceptions/NotFoundError";
// ------ Model ------
import UsersModel from "../models/Users-model";

class UserController {
    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { name, description } = req.body;
            const userData = await postService.create({ name, description });
            return res.status(201).json({
                value: userData,
                message: "Post successfully create",
                status: "success",
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async view(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const id = req.params.id;
        const user = await UsersModel.findById(id);
        if (!user) {
            throw new NotFoundError("Post with id not found");
        }
        return user;
    }

    async update(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id, name, description } = req.body;
            const userData = await postService.update({ id, name, description });
            return res.status(201).json({
                value: userData,
                message: "Post successfully update",
                status: "success",
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.body;
            await postService.delete(id);
            return res.status(204).json({
                value: null,
                message: "Post successfully delete",
                status: "success",
            });
        } catch (err) {
            console.log(err);
        }
    }
}

export default new UserController();