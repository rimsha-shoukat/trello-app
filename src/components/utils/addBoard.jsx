"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";

export function AddBoard({ setAddNewBoard, setAddNewTitle, setActiveBoard, fetchBoards, setLists }) {
    const [boardName, setBoardName] = useState("");
    const [error, setError] = useState("");

    const handleCreateBoard = async () => {
        if (boardName.trim() === "") {
            setError("Board name cannot be empty!");
            return;
        }
        try {
            let res = await axios.patch("/api/user/add-board", { boardName });
            setActiveBoard(res.data.newBoard || null);
            setLists(res.data.newBoard.lists || []);
            setAddNewBoard(false);
            setAddNewTitle(true);
            setBoardName("");
            fetchBoards();
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
            setActiveBoard(null);
            setLists([]);
            setError(errorMessage);
        }
    }

    return (
        <>
            <section onClick={() => { setAddNewBoard(false); setActiveBoard(null); setLists([]); }} className="absolute w-full h-full bg-[#162238]/50 dark:bg-white/20 shadow-sm">
            </section>
            <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <CardHeader>
                    <CardTitle>Create Board</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid gap-2">
                            <Label>Add Board name</Label>
                            <Input onChange={(e) => setBoardName(e.target.value)}
                                id="board"
                                type="text"
                                placeholder="Enter Board name"
                                required
                            />
                        </div>
                    </form>
                    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleCreateBoard} type="submit" className="w-full">
                        Create Board
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
