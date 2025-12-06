"use server";
import { Board } from "@/models/board.model.js";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/app/database/db.js";
import { NextResponse } from "next/server";

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

        const { boardId, listId, cardId, text } = await request.json();

        const board = await Board.findOne({ _id: boardId, user: userId });
        if (!board) return NextResponse.json({ error: "Board not found" }, { status: 404 });

        const list = board.lists.id(listId);
        if (!list) return NextResponse.json({ error: "List not found" }, { status: 404 });

        const card = list.cards.id(cardId);
        if (!card) return NextResponse.json({ error: "Card not found" }, { status: 404 });

        card.text = text;
        await board.save();

        return NextResponse.json({ message: "Card updated successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
