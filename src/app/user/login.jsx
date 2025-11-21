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
import { toast } from "react-hot-toast"

export function Login({setShowLogin, setShowSignup, setLoginUser}) {
  const[user, setUser] = useState({nameOrEmail: "", password: ""});
  const[res, setRes] = useState({show: false, error:false, message:""});

  useEffect(() => {
    setRes({show:false, error:false, message:""});
  },[user]);

  const handleLogin = async() => {
    try {
      const response = await axios.post("/api/user/login", user);
      console.log(response);
      const successData = response.data;
      setRes({show: true, error: false, message: successData});
      toast.success("User logged in successfully!!");
      setShowLogin(false);
      setLoginUser(true);
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
    <section onClick={ () => {setShowLogin(false)} } className="absolute w-[100%] h-[100%] bg-white/20">
    </section>
    <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button onClick={() => {setShowLogin(false); setShowSignup(true)}} variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <form onSubmit={ (e) => handleLogin(e) }>
      <CardContent className="mb-4">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Name OR Email</Label>
              <Input
                onChange={ (e) => setUser({...user, nameOrEmail: e.target.value})}
                id="nameOrEmail"
                type="email"
                placeholder="Name || Email"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input 
              onChange={ (e) => setUser({...user, password: e.target.value}) }
              id="password" 
              type="password" 
              required />
            </div>
          </div>
          { res.show && <p className={`text-sm ${res.error? "text-red-800": "text-green-800"}`}>{res.message}</p>}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </form>
    </Card>
    </>
  )
}
