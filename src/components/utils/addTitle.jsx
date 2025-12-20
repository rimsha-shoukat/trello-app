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
import { useState } from "react";

export function AddTitle({ showList, setAddNewText, setAddNewTitle, activeBoard, setActiveListId, setActiveNoteId, fetchNotes, fetchBoards }) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const handleCreateTitle = async () => {
        if (title.trim() === "") {
            setError(`${showList ? "List" : "Note"} title cannot be empty!`);
            return;
        }
        try {
            let res = await axios.patch("/api/user/add-title", { title, boardId: activeBoard?._id, showList });
            setAddNewText(true);
            setAddNewTitle(false);
            if (showList) {
                setActiveListId(res.data.newList._id);
                fetchBoards();
            } else {
                setActiveNoteId(res.data.newNote._id);
                fetchNotes();
            }
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
            showList ? setActiveListId(null) : setActiveNoteId(null);
            setError(errorMessage);
        }
    }

    return (
        <>
            <section onClick={() => { setAddNewTitle(false); showList ? setActiveListId(null) : setActiveNoteId(null); }} className="absolute w-full h-full bg-[#162238]/50 dark:bg-white/20 shadow-sm">
            </section>
            <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <CardHeader>
                    <CardTitle>Create {showList ? "List" : "Note"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid gap-2">
                            <Label>Add {showList ? "List" : "Note"} title</Label>
                            <Input onChange={(e) => setTitle(e.target.value)}
                                id={showList ? "List" : "Note"}
                                type={showList ? "List" : "Note"}
                                placeholder={showList ? "List title" : "Note title"}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                    </form>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleCreateTitle} type="submit" className="w-full">
                        Create {showList ? "List" : "Note"}
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
