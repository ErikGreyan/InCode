import mongoose from "mongoose";
import { MONGODB_PASSWORD } from "../../src/config/config";

const mongoDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://calendarhstudent:${MONGODB_PASSWORD}@cluster0.axjkyoy.mongodb.net/`);
        console.log("Database connected successfully");
    } catch (err) {
        console.error(`Database connection error: ${err}`);
        process.exit(1);
    }
};

export default mongoDB;