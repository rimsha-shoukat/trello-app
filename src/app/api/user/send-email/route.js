"use server";
import { User } from "@/models/user.model.js";
import { NextResponse } from "next/server";
import connectDB from "@/app/database/db.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        await connectDB();

        const req = await request.json();
        const { email } = req;
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const token = jwt.sign({ id: user._id }, process.env.FORGOT_PASSWORD_TOKEN, { expiresIn: "1d" });

        user.forgotPasswordToken = token;
        user.forgotPasswordTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });

        (async () => {
            const info = await transporter.sendMail({
                from: process.env.NODEMAILER_USER,
                to: email,
                subject: `Forgot your password?`,
                text: "Reset password link is requested if you did not initiate this request, please ignore this email.",
                html: `<h3>Reset password link is requested if you did not initiate this request, please ignore this email.</h3><h2>Click <a href='${process.env.URL}/reset-password?token=${token}'>here</a> to reset your password</h2>`,
            });
        })();

        return NextResponse.json({ status: 200, message: "Password reset email sent successfully" });

    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
        }

        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}