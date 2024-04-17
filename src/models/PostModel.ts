import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    id: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    description: { type: String, required: true },
});

export default mongoose.model("posts", postSchema);