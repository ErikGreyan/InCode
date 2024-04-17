// ------ Model ------
import UsersModel from "../models/Users-model";
// ------ Error ------
import NotFoundError from "../exceptions/NotFoundError";
// ------ Interfaces ------
import { IUserUpdate } from "../interfaces/user-interfaces";

class userService {
    async getUserById(userId: number) {
        const user = await UsersModel.findById(userId);
        if (!user) {
            throw new NotFoundError("User with id not found");
        }
        return user;
    }

    async updateUser({ userId, name, email, password }: IUserUpdate) {
        const user = await UsersModel.findById(userId);
        if (!user) {
            throw new NotFoundError("User with id not found");
        }

        const userData = await UsersModel.findOneAndUpdate({ _id: user.id }, { $set: { name, email, password } }, { new: true })
        return userData;
    }

    async deleteUser(userId: string) {
        const userData = await UsersModel.findById(userId);
        if (!userData) {
            throw new NotFoundError("User with id not found");
        }

        await UsersModel.deleteOne({ _id: userId });
        return userData;
    }
}

export default new userService();