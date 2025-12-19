"use server";
import { Board } from "@/models/board.model.js";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/app/database/db.js";
import { NextResponse } from "next/server";
import { User } from "@/models/user.model.js";

export async function PATCH(request) {
    try {
        await connectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const userId = decoded.id;
        const { cardId, listId, boardId } = await request.json();
        const board = await Board.findOne({ _id: boardId, user: userId });

        if (!board) {
            return NextResponse.json({ error: "Board not found" }, { status: 404 });
        }

        const list = board.lists.id(listId);
        if (!list) {
            return NextResponse.json({ error: "List not found" }, { status: 404 });
        }
        await list.cards.id(cardId).deleteOne();
        await board.save();
        await User.findByIdAndUpdate(userId, { $pull: { cards: cardId } });
        let updatedBoard = await Board.findOne({ _id: boardId, user: userId });
        if (!updatedBoard) {
            return NextResponse.json({ error: "Board not found" }, { status: 404 });
        }
        return NextResponse.json(updatedBoard, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
