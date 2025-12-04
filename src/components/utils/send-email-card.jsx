"use client";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState, useEffect } from "react";
import axios from "axios";

export function SendEmailCard({ setNotice, setShowLogin, setShowEmailCard }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (email.trim() === "") {
            setError("Missing required fields!!");
        } else {
            setError(null);
        }
    }, [email]);

    const handleSendEmail = async () => {
        try {
            let res = await axios.post("/api/user/send-email", { email });
            const successMessage = res.data.message || "Password reset link sent to your email!!";
            setShowLogin(false);
            setShowEmailCard(false);
            setNotice(successMessage);
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
            setNotice(errorMessage);
        }
    }

    return (
        <>
            <section onClick={() => setShowEmailCard(false)} className="absolute w-full h-full bg-[#162238]/50 dark:bg-white/20 shadow-sm">
            </section>
            <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <CardHeader>
                    <CardTitle>Forgot password link will be send to</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-2 mb-4">
                            <div className="grid gap-2 mb-4">
                                <Label htmlFor="email">Enter your email</Label>
                                <Input
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    type="email"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button onClick={!error ? handleSendEmail : null} disabled={!!error} type="submit" className="w-full">
                        send
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
