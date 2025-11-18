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

export function Signup({setShowSignup, setShowLogin, setLoginUser}) {
  const [user, setUser] = useState({name: "", email: "", password: ""})

  const handleSignup = async() => {
    console.log(user);
    setShowSignup(false);
    const response = await axios.post("/api/user/signup", user);
    console.log(response);
    setLoginUser(true);
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
      <form onSubmit={ handleSignup }>
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
