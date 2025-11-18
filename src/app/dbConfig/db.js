import { mongoose } from "mongoose";

export default async function connect(){
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        connection.on("connected", () => {
            console.log("connected to mongodb");
        })
        connection.on("error", (error) => {
            console.log("mongodb connection error", error);
            process.exit(1);
        })
    } catch (error) {
        throw new Error("Something went wrong!!", error); 
    }
}