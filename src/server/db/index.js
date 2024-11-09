import mongoose from "mongoose";
//
import { DB_URI } from "@/config";

export const connectDB = async () => {
    try {
        console.log(DB_URI);
        const response = await mongoose.connect(DB_URI);
        console.log(response);
        return { status: true };
    } catch (error) {
        console.log(error);
        return { status: false };
    }
};
