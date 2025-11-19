import { mongoose } from "mongoose";

const cardSchema = new mongoose.Schema({
    text: {type: String, required: [true, "Card must contain some text"], trim: true},
    complete: {type: Boolean, default: false}
});

const listSchema = new mongoose.Schema({
    title: {type: String, required: [true, "List title is required"], trim: true},
    cards: {type: mongoose.Schema.Type.ObjectId, ref: [cardSchema]},
    complete: {type: Boolean, default: false}
},{timestamps: true});

const boardSchema = new mongoose.Schema({
    title: {type: String, required: [true, "Board title is required"], trim: true},
    lists: {type: mongoose.Schema.Type.ObjectId, ref: [listSchema]},
},{timestamps: true});

export const Board = mongoose.models.boards || mongoose.model("Board", boardSchema);