import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { type: String, required: [true, " Note must have title"], trim: true },
    text: { type: String, default: "Note contain no text" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);