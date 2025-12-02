"use server";
import connectDB from "@/app/dbConfig/db.js";
import { User } from "@/models/user.model.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request) {
    try { 
        await connectDB();
        const req = await request.json();
        const {name, email, password} = req;

        if(!name || !email || !password){
            return NextResponse.json({error: "Missing fields required!!"}, {status: 400});
        }

        if(name.trim() === ""){
            return NextResponse.json({error: "Name can't be empty!!"}, {status: 400});
        }
        if(email.trim() === ""){
            return NextResponse.json({error: "Email can't be empty!!"}, {status: 400});
        }
        if(password.trim() === ""){
            return NextResponse.json({error: "Password can't be empty!!"}, {status: 400});
        }

        if(password.length < 8){
            return NextResponse.json({error: "Password must be 8 characters long!!"}, {status : 400})
        }

        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exists!!"}, {status: 409});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email, 
            password: hashedPass
        });
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        },{status: 201});

    } catch (error) {
        return NextResponse.json({error: error.message || "Something went wrong!!"}, {status: 500});
    }
}