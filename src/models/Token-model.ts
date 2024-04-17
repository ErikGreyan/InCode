import mongoose, { Schema } from "mongoose";
// ------ Interfaces ------
import TokenInterface from "../interfaces/token-interfaces";

const tokenSchema = new Schema<TokenInterface>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    refresh: { type: String, required: true },
});

export default mongoose.model("tokens", tokenSchema);
