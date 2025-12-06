import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name field is required"], lowercase: true, trim: true },
    email: { type: String, required: [true, "Email field is required"], lowercase: true, unique: [true, "Already have an account"] },
    password: { type: String, required: [true, "Password field is required"] },
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board", default: [] }],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note", default: [] }],
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);