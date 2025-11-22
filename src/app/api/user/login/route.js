"use server";
import { User } from "@/models/user.model.js";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import connectDB from "@/app/dbConfig/db.js";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        await connectDB();
        const req = await request.json();

        const {identity, password} = req;
        if(!identity || !password){
            return NextResponse.json({error: "Missing required fields!!"},{status: 400})
        }
        if(identity.trim() === ""){
            return NextResponse.json({error: "Name or Email can't be empty!!"}, {status: 400});
        }
        if(password.trim() === ""){
            return NextResponse.json({error: "Password can't be empty!!"}, {status: 400});
        }
        
        const user = await User.findOne({
            $or:[{name:identity} , {email:identity}]
        });
        if(!user){
            return NextResponse.json({error: "User does not exist!!"}, {status: 401});
        }

        const validUser = bcryptjs.compare(password, user.password);
        if(!validUser){
            return NextResponse.json({error: "Incorrect password!!"},{status: 401});
        }
        
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        
        const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {expiresIn: "1d"});
        const response = NextResponse.json({
            message: "Login successful!!",
            success: true,
        },{status: 201});
        response.cookies.set("token", token, {httpOnly: true});
        return response;
        
    } catch (error) {
        return NextResponse.json({error: error.message || "Something went wrong while logging in user!!"},{status: 500})
    }
}