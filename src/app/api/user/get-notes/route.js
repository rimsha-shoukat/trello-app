"use server";
import { Note } from "@/models/note.model.js";
import { NextResponse } from "next/server";
import connectDB from "@/app/database/db.js";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
    try {
        await connectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json(null, { status: 200 });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const userId = decodedToken.id;

        let notes = await Note.find({ user: userId });
        return NextResponse.json(notes, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}