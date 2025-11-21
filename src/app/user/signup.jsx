"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export function Signup({setShowSignup, setShowLogin}) {
  const[user, setUser] = useState({name: "", email: "", password: ""});
  const[res, setRes] = useState({show: false, error:false, message: ""});

  useEffect(() => {
    setRes({show: false, error: false, message:""});
  },[user]);

  const handleSignup = async(e) => {
    e.preventDefault();
    if(user.password.length < 8){
      setRes({show: true, error: true, message:"Password must be atleast 8 characters long!!"});
      return;
    }
    
    try {
      const response = await axios.post("/api/user/signup", user);
      console.log(response);
      const successData = response.data;
      setRes({show: true, error: false, message: successData});
      toast.success("User created successfully!!");
      setShowSignup(false);
      setShowLogin(true);
    } catch (error) {
      let errorMessage = "An unknown error occurred!!";
      if(error.response){
        errorMessage = error.response.data.message || error.response.data || errorMessage;
      }else if(error.request){
        errorMessage = "Network Error!! please check your internet connection.";
      }else{
        errorMessage = error.message;
      }
      setRes({ show: true, error: true, message: errorMessage });
      toast.error(errorMessage);
    }
  }
  
  return (
    <>
    <section onClick={ () => {setShowSignup(false)} } className="absolute w-[100%] h-[100%] bg-white/20">
    </section>
    <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle>Create new account</CardTitle>
        <CardDescription>
          Provide your name & email below to create new account
        </CardDescription>
        <CardAction>
          <Button onClick={() => {setShowLogin(true); setShowSignup(false)}} variant="link">Log In</Button>
        </CardAction>
      </CardHeader>
      <form onSubmit={ (e) => handleSignup(e) }>
      <CardContent className="mb-4">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input 
                onChange={ (e) => setUser({...user, name: e.target.value}) }
                id="name"
                type="name"
                placeholder="admin"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                onChange={ (e) => setUser({...user, email: e.target.value}) }
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
              onChange={(e) => setUser({...user, password: e.target.value})}
              id="password" 
              type="password"
              required />
            </div>
          </div>
          {res.show && <p className={`text-sm ${res.error? "text-red-800" : "text-green-800"}`}>{res.message}</p>}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          SignUp
        </Button>
        <Button variant="outline" className="w-full">
          SignUp with Google
        </Button>
      </CardFooter>
    </form>
    </Card>
    </>
  )
}
