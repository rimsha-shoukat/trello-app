"use server";
import { User } from "@/models/user.model.js";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import connectDB from "@/app/dbConfig/db.js";
import jwt from "jsonwebtoken";

export async function POST({request}) {
    try {
        await connectDB();
        const req = await request.json();
        const {name, email, password} = req;
        if((!name && !email) || !password){
            return NextResponse.json({message: "Missing required fields!!"},{status: 400})
        }

        const user = await User.findOne({
            $or:[{name:name} , {email:email}]
        });
        if(!user){
            return NextResponse.json({message: "User does not exist!!"}, {status: 401});
        }

        const validUser = bcryptjs.compare(password, user.password);
        if(!validUser){
            return NextResponse.json({message: "Incorrect password!!"},{status: 401});
        }
        
        const tokenData = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        
        const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {expiresIn: "1d"});
        const response = NextResponse.json({
            message: "login successful!!",
            success: true,
        });
        response.cookies.set("token", token, {httpOnly: true});
        return response;
        
    } catch (error) {
        return NextResponse.json({error: error.message || "Something went wrong while logging in user!!"},{status: 500})
    }
}