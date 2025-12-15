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

        const { boardId } = await request.json();

        const board = await Board.findOne({ _id: boardId, user: userId });
        if (!board) {
            return NextResponse.json({ error: "Board not found" }, { status: 404 });
        }
        await board.deleteOne();
        await User.findByIdAndUpdate(userId, { $pull: { boards: boardId } });

        let boards = await Board.find({ user: userId });
        return NextResponse.json(boards, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
