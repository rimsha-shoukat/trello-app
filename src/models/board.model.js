import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    text: { type: String, required: [true, "Card must contain some text"], trim: true },
    complete: { type: Boolean, default: false }
});

const listSchema = new mongoose.Schema({
    title: { type: String, required: [true, "List title is required"], trim: true },
    cards: { type: [cardSchema], default: [] },
    complete: { type: Boolean, default: false }
}, { timestamps: true });

const boardSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Board title is required"], trim: true },
    lists: { type: [listSchema], default: [] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export const Board = mongoose.models.Board || mongoose.model("Board", boardSchema);