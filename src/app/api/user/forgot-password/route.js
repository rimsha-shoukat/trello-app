"use server";
import { User } from "@/models/user.model.js";
import { NextResponse } from "next/server";
import connectDB from "@/app/database/db";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export async function POST(request) {
    try {
        await connectDB();
        const req = await request.json();
        const { password, token } = req;
        const decoded = jwt.verify(token, process.env.FORGOT_PASSWORD_TOKEN);
        const userId = decoded.id;
        const user = await User.findOne({ _id: userId, forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
        }

        const salt = await bcryptjs.genSalt(10);
        const encryptedPassword = await bcryptjs.hash(password, salt);
        user.password = encryptedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({ status: 200, message: "Password updated successfully" });

    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
        }

        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}