"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
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
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
    const router = useRouter();
    const [password, setPassword] = useState({ one: "", two: "" });
    const [res, setRes] = useState({ show: false, error: false, message: "" });
    const [validToken, setValidToken] = useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    (async () => {
        try {
            let res = await axios.post("/api/user/valid-token", { token });
            if (res.status === 200) {
                setValidToken(true);
            }
        } catch (error) {
            setValidToken(false);
        }
    })();


    useEffect(() => {
        setRes({ show: false, error: false, message: "" });
    }, [password]);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password.one !== password.two) {
            setRes({ show: true, error: true, message: "Passwords do not match!!" });
            return;
        }

        try {
            const response = await axios.post("/api/user/forgot-password", { password: password.one, token: token });
            const successMessage = response.data.message || "Password updated successfully!!";
            setRes({ show: true, error: false, message: successMessage });
            router.push("/");
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

    if (!validToken) {
        return (
            <>
                <section className="absolute w-full h-full bg-[#162238]/50 dark:bg-white/20 shadow-sm">
                </section>
                <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <CardHeader>
                        <CardTitle>Invalid or Expired Token</CardTitle>
                        <CardDescription>
                            The password reset link is invalid or has expired. Please request a new link to reset your password.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </>
        )
    }
    return (
        <>
            <section className="absolute w-full h-full bg-[#162238]/50 dark:bg-white/20 shadow-sm">
            </section>
            <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <CardHeader>
                    <CardTitle>Reset your password</CardTitle>
                    <CardDescription>
                        Enter your new password below to reset your old password
                    </CardDescription>
                </CardHeader>
                <form onSubmit={(e) => handleResetPassword(e)}>
                    <CardContent className="mb-4">
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label>Enter new password</Label>
                                <Input
                                    onChange={(e) => setPassword({ ...password, one: e.target.value })}
                                    id="one"
                                    type="password"
                                    placeholder="New password"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Again enter new password</Label>
                                <Input
                                    onChange={(e) => setPassword({ ...password, two: e.target.value })}
                                    id="two"
                                    type="password"
                                    placeholder="Password"
                                    required />
                            </div>
                        </div>
                        {res.show && <p className={`text-sm ${res.error ? "text-red-800" : "text-green-800"}`}>{res.message}</p>}
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            update password
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}
