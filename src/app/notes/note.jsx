'use client';
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Notebook } from "lucide-react";
import axios from "axios";

export function Note({ setAddNewTitle, user, setNotice, notes, setNotes }) {

    if (user.notes.length <= 0) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <div className="break-inside-avoid flex flex-col items-center justify-center gap-4">
                    <Notebook />
                    <h1>No Notes Yet!</h1>
                    <p>You haven&apos;t created any notes yet. Get started by creating
                        your first note.</p>
                    <Button onClick={() => { setAddNewTitle(true) }}>Create Note</Button>
                </div>
            </div>
        )
    }

    const fetchNotes = async () => {
        try {
            let res = await axios.get("/api/user/get-notes");
            setNotes(res.data || null);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, [user]);

    const handleShow = (id) => {
        let section = document.getElementById(id);
        if (section.style.display === "none") {
            section.style.display = "block";
            return;
        }
        section.style.display = "none";
    }

    const handleNoteUpdate = async (noteId) => {
        let value = document.querySelector(`section[id='${noteId}'] textarea`).value;
        try {
            await axios.patch("/api/user/update-note", { noteId, text: value });
            setNotice("Note updated successfully!");
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
        <div className="w-full h-auto columns-2 max-[750px]:columns-1">
            {notes.map((note) => (
                <div key={note._id} className="break-inside-avoid mb-4 w-full h-auto p-4 rounded-md border border-gray-600 bg-gray-200 dark:bg-gray-900 shadow-sm">
                    <span className="w-full flex flex-row items-center justify-between mb-4">
                        <span>
                            <h1>{note.title}</h1>
                            <p className="text-xs">Created at: {note.createdAt}</p>
                        </span>
                        <Button onClick={() => handleShow(note._id)} className="hover:bg-gray-300" variant="ghost"><ChevronDown /></Button>
                    </span>
                    <section id={note._id} className="w-full h-auto flex flex-col items-start justify-center gap-2 transition-transform duration-300 ease-in-out">
                        <textarea onClick={() => handleNoteUpdate(note._id)} className="text-justify" defaultValue={note.text} />
                    </section>
                </div>
            ))}

        </div>
    )
}