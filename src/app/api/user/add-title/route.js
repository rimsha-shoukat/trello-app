"use server";
import { User } from "@/models/user.model.js";
import { Note } from "@/models/note.model.js";
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

        const req = await request.json();
        const { title, boardId } = req;

        if (!title || title.trim() === "") {
            return NextResponse.json({ error: "Title is a required field" }, { status: 400 });
        }

        const user = await User.findOne({ _id: loggedInUserId }).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (boardId === null) {
            const existingNote = await Note.findOne({ title: title, user: loggedInUserId });
            if (existingNote) {
                return NextResponse.json({ error: "Note title already exists" }, { status: 400 });
            }

            const newNote = new Note({ title: title, text: "", user: loggedInUserId });
            await newNote.save();

            user.notes.push(newNote._id);
            await user.save();
            return NextResponse.json({
                message: "Note created successfully",
                success: true,
                newNote
            }, { status: 200 });
        }

        const board = await Board.findOne({ _id: boardId, user: loggedInUserId });
        if (!board) {
            return NextResponse.json({ error: "Board not found" }, { status: 404 });
        }

        if (board.lists && board.lists.some(list => list.title === title)) {
            return NextResponse.json({ error: "List title already exists" }, { status: 400 });
        }

        board.lists.push({ title: title, cards: [] });
        await board.save();
        let newList = board.lists[board.lists.length - 1];

        return NextResponse.json({
            message: "List created successfully",
            success: true,
            newList
        }, { status: 200 });

    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
        }
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}