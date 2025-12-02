"use server";
import { User } from "@/models/user.model.js";
import { NextResponse } from "next/server";
import connectDB from "@/app/database/db.js";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) { 
    try {
        await connectDB();

        const req = await request.json();
        const { email } = req;
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // send an email

    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
        }
        
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}