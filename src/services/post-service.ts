// ------ Model ------
import PostModel from "../models/PostModel";

class postService {
    async create({ name, description }) {
        const post = await PostModel.create({ name, description });

        await post.save();
        return post;
    }

    async update({ id, name, description }) {
        const post = await PostModel.findByIdAndUpdate({ _id: id }, { $set: { name, description } }, { new: true })
        await post.save();
        return post;
    }

    async delete({ id }) {
        const postData = await PostModel.deleteOne({ _id: id });
        return postData;
    }
}

export default new postService();