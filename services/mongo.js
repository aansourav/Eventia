import mongoose from "mongoose";

export async function dbConnect() {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB!");
        return connection;
    } catch (error) {
        console.log(error);
    }
}
