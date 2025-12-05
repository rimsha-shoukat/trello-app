"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { UserAlert } from "@/components/utils/user-alert.jsx";
import React, { useState, useEffect } from "react";
import { UpdateUser } from "@/components/utils/update-user.jsx";

export function Profile({ setShowProfile, fetchUser, user, setNotice }) {
    const [alert, setAlert] = useState(null);
    const [form, setForm] = useState(null);

    useEffect(() => {
        setForm(null);
    }, []);

    if (!user) {
        return (
            <div className="w-full h-screen flex flex-col gap-4 items-center justify-center text-2rem">
                <h1>Please login to view profile</h1>
                <button onClick={() => setShowLogin(true)} className="underline hover:text-blue-800">Click here to login</button>
            </div>
        )
    }

    const handleUpdate = async (apiEndpoint, user, successMessage) => {
        try {
            let res = await axios.patch(apiEndpoint, user);
            setNotice(res.data.message || successMessage);
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
            setNotice(errorMessage);
        } finally {
            setAlert(null);
            setShowProfile(false);
        }
    };

    const showConfirmationAlert = (updateFunction) => {
        setAlert({
            title: "User update confirmation!!",
            description: "This action can't be undone!!",
            onCancel: () => {
                setAlert(null);
                setShowProfile(false);
            },
            onContinue: updateFunction
        });
    };

    const handleEdit = (action, title, inputI, inputIType, inputII, inputIIType, apiEndpoint, successMessage) => {
        setForm({
            action,
            title,
            inputI,
            inputIType,
            inputII,
            inputIIType,
            onCancel: () => {
                setForm(null);
                setShowProfile(false);
            },
            onSave: (user) => {
                setForm(null);
                showConfirmationAlert(() => handleUpdate(apiEndpoint, user, successMessage));
            }
        });
    };

    const handleLogout = async () => {
        setAlert({
            title: "Logout confirmation!!",
            description: "Are you sure you want to logout of your account?",
            onCancel: () => {
                setAlert(null);
                setShowProfile(false);
            },
            onContinue: async () => {
                try {
                    let res = await axios.get("/api/user/logout");
                    setNotice(res.data.message || "User logout successfully!!");
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
                    setNotice(errorMessage);
                } finally {
                    setAlert(null);
                    setShowProfile(false);
                }
            }
        })
    }

    const handleDelete = async () => {
        setForm({
            action: "Delete",
            title: "Verify it's you!!",
            inputI: "Email",
            inputIType: "email",
            inputII: "Password",
            inputIIType: "password",
            onCancel: () => {
                setForm(null);
                setShowProfile(false);
            },
            onSave: (user) => {
                setForm(null);
                setAlert({
                    title: "Delete account confirmation!!",
                    description: "This action can't be undone!!",
                    onCancel: () => {
                        setAlert(null);
                        setShowProfile(false);
                    },
                    onContinue: async () => {
                        try {
                            let res = await axios.post("/api/user/delete", { user });
                            setNotice(res.data.message || "Account deleted successfully!!");
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
                            setNotice(errorMessage);
                        } finally {
                            setAlert(null);
                            setShowProfile(false);
                        }
                    }
                });
            }
        });
    }

    const sendEmail = async (email) => {
        setAlert({
            title: "Reset password!!",
            description: `Reset password link will be sent to ${email}`,
            onCancel: () => {
                setAlert(null);
                setShowProfile(false);
            },
            onContinue: async () => {
                try {
                    let res = await axios.post("/api/user/send-email", { email });
                    setNotice(res.data.message || "Email send successfully!!");
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
                } finally {
                    setAlert(null);
                    setShowProfile(false);
                }
            }
        });
    }

    return (
        <>
            <section onClick={() => { setShowProfile(false) }} className="absolute w-full h-full bg-white/20">
            </section>
            <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardAction>
                        <Button variant="link" onClick={() => sendEmail(user?.email)}>Forgot password</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <h1>{user?.name}</h1>
                            <CardAction>
                                <Button onClick={() => handleEdit("Update", "Update user name!!", "Enter old name", "text", "Enter new name", "text", "/api/user/edit-name", "User name updated successfully!!")} variant="link">Edit</Button>
                            </CardAction>
                        </div>
                        <div className="grid gap-2">
                            <h1>{user?.email}</h1>
                            <CardAction>
                                <Button onClick={() => handleEdit("Update", "Update user email!!", "Enter old email", "email", "Enter new email", "email", "/api/user/edit-email", "User email updated successfully!!")} variant="link">Edit</Button>
                            </CardAction>
                        </div>
                        <div className="grid gap-2">
                            <h1>********</h1>
                            <CardAction>
                                <Button onClick={() => handleEdit("Update", "Update user password!!", "Enter old password", "password", "Enter new password", "password", "/api/user/edit-password", "User password updated successfully!!")} variant="link">Edit</Button>
                            </CardAction>
                        </div>
                        <div className="w-full flex flex-row">
                            <h1 className="w-[50%]">Notes: {user?.notes?.length || "null"} </h1>
                            <h1 className="w-[50%]">Boards: {user?.boards?.length || "null"} </h1>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-row gap-2">
                    <Button onClick={handleLogout} type="submit" className="w-1/2">
                        Logout
                    </Button>
                    <Button onClick={handleDelete} variant="outline" className="w-1/2">
                        Delete Account
                    </Button>
                </CardFooter>
            </Card>
            {alert && <UserAlert alert={alert} />}
            {form && <UpdateUser form={form} />}
        </>
    )
}