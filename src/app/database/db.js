import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("connected to mongodb");
        })
        connection.on("error", (error) => {
            console.log("mongodb connection error", error);
            process.exit(1);
        })
    } catch (error) {
        console.log(`Database connection failed!! ${error.message}`);
        process.exit(1);
    }
}