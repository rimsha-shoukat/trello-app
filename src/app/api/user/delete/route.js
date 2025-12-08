"use server";
import { User } from "@/models/user.model.js";
import { Note } from "@/models/note.model.js";
import { Board } from "@/models/board.model.js";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import connectDB from "@/app/database/db.js";

export async function POST(request) {
    try {
        await connectDB();
        const req = await request.json();
        const { fieldI, fieldII } = req.user;

        if (!fieldI || !fieldII) {
            return NextResponse.json({ error: "Missing required fields!!" }, { status: 400 })
        }

        const user = await User.findOne({ email: fieldI });
        if (!user) {
            return NextResponse.json({ error: "User does not exists!!" }, { status: 409 })
        }

        const validUser = await bcryptjs.compare(fieldII, user.password);
        if (!validUser) {
            return NextResponse.json({ error: "Incorrect password!!" }, { status: 401 });
        }
        await Note.find({ user: user._id }).deleteMany();
        await Board.find({ user: user._id }).deleteMany();
        const deletedUser = await User.deleteOne({ email: fieldI });
        if (deletedUser.deletedCount > 0) {
            return NextResponse.json({
                message: "Account deleted successfully!!",
                success: true,
            }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Failed to delete user." }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ error: error.message || "Something went wrong!!" }, { status: 500 })
    }
}