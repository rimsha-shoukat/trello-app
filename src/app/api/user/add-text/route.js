"use server";
import { User } from "@/models/user.model.js";
import { Note } from "@/models/note.model.js"; 
import { Board } from "@/models/board.model.js"; 
import { NextResponse } from "next/server";
import connectDB from "@/app/database/db.js";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import mongoose from "mongoose";

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

        const req = await request.json();
        const { text, boardId, listId, noteId } = req;

        if (!text || text.trim() === "") {
            return NextResponse.json({ error: "Text is a required field" }, { status: 400 });
        }
        
        const user = await User.findOne({ _id: loggedInUserId }).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (listId === null || boardId === null) {
            if (!noteId) {
                return NextResponse.json({ error: "noteId is required to update a note" }, { status: 400 });
            }
            const note = await Note.findOne({ _id: noteId, user: loggedInUserId });
            if (!note) {
                return NextResponse.json({ error: "Note not found or not owned by user" }, { status: 404 });
            }
            note.text = note.text ? `${note.text}\n${text}` : text;
            await note.save();
            return NextResponse.json({
                message: "Note updated successfully",
                success: true,
                note: note,
            }, { status: 200 });
        }

        if (noteId === null) {
            if (!boardId || !listId) {
                return NextResponse.json({ error: "boardId and listId are required to add a card" }, { status: 400 });
            }
            const board = await Board.findOne({ _id: boardId, user: loggedInUserId });
            if (!board) {
                return NextResponse.json({ error: "Board not found" }, { status: 404 });
            }
            const list = board.lists.id(listId);
            if (!list) {
                return NextResponse.json({ error: "List not found" }, { status: 404 });
            }
            list.cards.push({ text: text, complete: false });
            await board.save();
            return NextResponse.json({
                message: "Card added successfully",
                success: true,
                board: board,
            }, { status: 200 });
        }

        const note = await Note.findOne({ _id: noteId, user: loggedInUserId });
        if (!note) {
            return NextResponse.json({ error: "Note not found or not owned by user" }, { status: 404 });
        }
        note.text = note.text ? `${note.text}\n${text}` : text;
        await note.save();
        return NextResponse.json({
            message: "Note updated successfully",
            success: true,
            note: note,
        }, { status: 200 });

    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
        }
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}
