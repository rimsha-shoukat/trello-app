"use server";
import { User } from "@/models/user.model.js";
import { NextResponse } from "next/server";
import connectDB from "@/app/database/db.js";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        await connectDB();
        const req = await request.json();
        const { token } = req;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.FORGOT_PASSWORD_TOKEN);
        const userId = decoded.id;
        const user = await User.findOne({ _id: userId, forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
        }
        return NextResponse.json({ status: 200, message: "Token is valid" });
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
    }
}