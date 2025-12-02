"use server";
import { User } from "@/models/user.model.js";
import { NextResponse } from "next/server";
import connectDB from "@/app/dbConfig/db.js";
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
        const loggedInUserId = decodedToken.id;

        const user = await User.findOne({ _id: loggedInUserId }).select("-password");

        if (!user) {
            return NextResponse.json(null, { status: 200 });
        }

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
        }

        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}