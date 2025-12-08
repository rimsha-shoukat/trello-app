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

        const req = await request.json();
        const { boardName } = req;

        if (!boardName || boardName.trim() === "") {
            return NextResponse.json({ error: "Board name is a required field" }, { status: 400 });
        }

        const user = await User.findOne({ _id: loggedInUserId }).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const existingBoard = await Board.findOne({ title: boardName, user: loggedInUserId });
        if (existingBoard) {
            return NextResponse.json({ error: "Board name already exists" }, { status: 400 });
        }

        const newBoard = await new Board({ title: boardName, lists: [], user: loggedInUserId });
        await newBoard.save();

        user.boards.push(newBoard._id);
        const updatedUser = await user.save();

        return NextResponse.json({
            message: "Board created successfully",
            success: true,
            newBoard
        }, { status: 200 });

    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
        }
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}
