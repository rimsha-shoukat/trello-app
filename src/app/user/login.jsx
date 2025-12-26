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
import { SendEmailCard } from "@/components/utils/send-email-card.jsx";

export function Login({ setShowLogin, setShowSignup, fetchUser, setNotice }) {
    const [user, setUser] = useState({ email: "", password: "" });
    const [res, setRes] = useState({ show: false, error: false, message: "" });
    const [showEmailCard, setShowEmailCard] = useState(false);

    useEffect(() => {
        setRes({ show: false, error: false, message: "" });
    }, [user]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/user/login", user);
            const successMessage = response.data.message || "User logged in successfully!!";
            setRes({ show: true, error: false, message: successMessage });
            setShowLogin(false);
            await fetchUser();
        } catch (error) {
            let errorMessage = "An unknown error occurred!!";
            if (error.response) {
                if (typeof error.response.data.message === 'string') {
                    errorMessage = error.response.data.message;
                } else if (typeof error.response.data === 'string') {
                    errorMessage = error.response.data;
                } else if (error.response.data && typeof error.response.data === 'object' && error.response.data.error) {
                    errorMessage = error.response.data.error;
                }
            } else if (error.request) {
                errorMessage = "Network Error!! please check your internet connection.";
            } else {
                errorMessage = error.message;
            }
            setRes({ show: true, error: true, message: errorMessage });
        }
    }

    const handleResetPassword = () => {
        setShowEmailCard(true);
    }

    return (
        <>
            <section onClick={() => { setShowLogin(false) }} className="absolute w-full h-full bg-[#162238]/50 dark:bg-white/20 shadow-sm">
            </section>
            <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button onClick={() => { setShowLogin(false); setShowSignup(true) }} variant="link">Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <form onSubmit={(e) => handleLogin(e)}>
                    <CardContent className="mb-4">
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label>Email</Label>
                                <Input
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a onClick={handleResetPassword}
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    required />
                            </div>
                        </div>
                        {res.show && <p className={`text-sm ${res.error ? "text-red-800" : "text-green-800"}`}>{res.message}</p>}
                    </CardContent>
                    <CardFooter className="mt-2">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            {showEmailCard && <SendEmailCard setNotice={setNotice} setShowLogin={setShowLogin} setShowEmailCard={setShowEmailCard} />}
        </>
    )
}
