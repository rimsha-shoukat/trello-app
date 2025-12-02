"use server";
import { User } from "@/models/user.model.js";
import { NextResponse } from "next/server";
import connectDB from "@/app/dbConfig/db.js";
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
        const { fieldI, fieldII } = req;

        if (!fieldI || !fieldII) {
            return NextResponse.json({ error: "Old and new email are required fields" }, { status: 400 });
        }

        if(fieldI === fieldII){
            return NextResponse.json({ error: "New email must be different from old email" }, { status: 400 });
        }

        const user = await User.findOne({ _id: loggedInUserId });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (user.email !== fieldI) {
            return NextResponse.json({ error: "Incorrect old user email" }, { status: 401 });
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            loggedInUserId,
            { email: fieldII },
            { new: true } 
        );
        
        return NextResponse.json({
            message: "User email updated successfully",
            success: true,
            user: updatedUser,
        }, { status: 200 });

    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
        }
        
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}
