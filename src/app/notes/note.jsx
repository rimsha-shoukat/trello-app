'use client';
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Notebook, DiamondMinus, CloudCheck } from "lucide-react";
import axios from "axios";

export function Note({ setAddNewTitle, user, setNotice, notes, fetchNotes }) {
    const [saveId, setSaveId] = useState(null);

    if (user.notes.length <= 0 || user.notes === null || user.notes === undefined) {
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

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleShow = (id) => {
        let section = document.getElementById(id);
        section.style.display = section.style.display === "none" ? "block" : "none";
    }

    const handleNoteUpdate = async (noteId) => {
        let value = document.querySelector(`section[id='${noteId}'] textarea`).value;
        setSaveId(noteId);
        try {
            await axios.patch("/api/user/update-note", { noteId, text: value });
            fetchNotes();
            setNotice("Note updated successfully");
            setSaveId(null);
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

    const handleRemoveNote = async (noteId) => {
        try {
            await axios.patch("/api/user/remove-note", { noteId });
            fetchNotes();
            setNotice("Note removed successfully");
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
        <div className="w-full h-auto columns-2 max-[750px]:columns-1 min-h-screen overflow-y-auto">
            {notes.map((note) => (
                <div key={note._id} className="break-inside-avoid mb-4 w-full h-auto p-4 rounded-md border border-gray-600 bg-gray-200 dark:bg-gray-900 shadow-sm">
                    <span className="w-full flex flex-row items-start justify-between mb-4">
                        <span>
                            <h1 className="font-bold">{note.title}</h1>
                            <p className="text-xs">created at: {new Date(note.createdAt).toLocaleString('en-GB', {
                                day : '2-digit',
                                month : '2-digit',
                                year : 'numeric',
                                hour : '2-digit',
                                minute : '2-digit'
                            })}</p>
                        </span>
                        <span className="flex flex-row items-center justify-center flex-nowrap">
                            {saveId !== note._id && <Button onClick={() => handleRemoveNote(note._id)} className="hover:bg-gray-300" variant="ghost"><DiamondMinus /></Button>}
                            {saveId === note._id && <Button onClick={() => handleNoteUpdate(note._id)} className="hover:bg-gray-300" variant="ghost"><CloudCheck /></Button>}
                            <Button onClick={() => handleShow(note._id)} className="hover:bg-gray-300" variant="ghost"><ChevronDown /></Button>
                        </span>
                    </span>
                    <section id={note._id} className="w-full h-auto flex flex-col items-start justify-center gap-2 transition-transform duration-300 ease-in-out">
                        <textarea onClick={() => setSaveId(note._id)} rows="5" className="text-justify w-full h-auto p-2 focus:border-0 focus:ring-0" defaultValue={note.text || "No content added yet!"} />
                    </section>
                </div>
            ))}
        </div>
    )
}