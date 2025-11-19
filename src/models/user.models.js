import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name field is required"], lowerCase: true, unique: [true, "Name must be unique"], trim: true},
    email: {type: String, required: [true, "Email field is required"], lowercase: true, unique: [true, "Already have an account"]},
    password: {type: String, required: [true, "Password field is required"]},
    boards: {type: mongoose.Schema.Type.ObjectId, ref: "Board"},
    notes: {type: mongoose.Schema.Type.OjectId, ref: "Note"},
    refreshToken: {type: String},
    passwordToken: {type: String}
},{timestamps: true});

export const User = mongoose.models.users || mongoose.model("User", userSchema);