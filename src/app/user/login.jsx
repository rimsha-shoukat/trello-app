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
import React, { useState } from "react";
import axios from "axios";

export function Login({setShowLogin, setShowSignup, setLoginUser}) {
  const [user, setUser] = useState({email, password});

  const handleLogin = async() => {
    console.log(from);
    setShowLogin(false);
    const response = await axios.post("/api/user/login", user);
    console.log(response);
    setLoginUser(true);
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
      <form onSubmit={ handleLogin }>
      <CardContent className="mb-4">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={ (e) => setUser({...user, email: e.target.value})}
                id="email"
                type="email"
                placeholder="admin@example.com"
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
