"use server";
import { User } from "@/models/user.model.js";
import { Board } from "@/models/board.model.js"; 
import { NextResponse } from "next/server";
import connectDB from "@/app/database/db.js";
import jwt from "jsonwebtoken"; 
import { cookies } from "next/headers";

export async function PATCH(request) {
    try {
        await connectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const loggedInUserId = decodedToken.id;

        const user = await User.findOne({ _id: loggedInUserId }).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const req = await request.json();
        const { check, cardId, listId, boardId } = req;

        if (typeof check !== 'boolean') {
            return NextResponse.json({ error: "Check must be a boolean" }, { status: 400 });
        }

        const board = await Board.findOne({ _id: boardId, user: loggedInUserId });
        if (!board) {
            return NextResponse.json({ error: "Board not found" }, { status: 404 });
        }

        const list = board.lists.id(listId);
        if (!list) {
            return NextResponse.json({ error: "List not found" }, { status: 404 });
        }

        const card = list.cards.id(cardId);
        if (!card) {
            return NextResponse.json({ error: "Card not found" }, { status: 404 });
        }

        card.complete = check;
        await board.save();

        return NextResponse.json({ message: "Card updated successfully" }, { status: 200 });
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
        }
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}
