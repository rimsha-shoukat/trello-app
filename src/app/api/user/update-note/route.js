"use server";
import { Note } from "@/models/note.model.js";
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

        const { noteId, text } = await request.json();

        const note = await Note.findOne({ _id: noteId, user: userId });
        if (!note) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        note.text = text;
        await note.save();

        return NextResponse.json({ message: "Note updated successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
