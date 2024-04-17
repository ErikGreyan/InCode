import { config } from "dotenv";
config({ path: ".env" });

export const {
    PORT,
    FRONT_END,
    SESSION_SECRET,
    MONGODB_URI,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET
} = process.env;