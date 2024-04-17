import mongoose from "mongoose";
import { MONGODB_URI } from "../../src/config/config";

const mongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected successfully");
    } catch (err) {
        console.error(`Database connection error: ${err}`);
        process.exit(1);
    }
};

export default mongoDB;