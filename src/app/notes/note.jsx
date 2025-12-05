'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Notebook } from "lucide-react";

export function Note({ setAddNewTitle, user }) {
    const [notes, setNotes] = useState(user.notes || []);

    if (notes.length <= 0) {
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

    const handleShow = (id) => {
        let section = document.getElementById(id);
        if (section.style.display === "none" || section.style.display === "") {
            section.style.display = "block";
            return;
        }
        section.style.display = "none";
    }

    return (
        <div className="w-full h-auto columns-2 max-[750px]:columns-1">
            {notes.map((note) => (
                <div key={note.id} className="break-inside-avoid mb-4 w-full h-auto p-4 rounded-md border border-gray-600 bg-gray-200 dark:bg-gray-900 shadow-sm">
                    <span className="w-full flex flex-row items-center justify-between mb-4">
                        <span>
                            <h1>{note.title}</h1>
                            <p className="text-xs">Created at: {note.createdAt}</p>
                        </span>
                        <Button onClick={() => handleShow(note.id)} className="hover:bg-gray-300" variant="ghost"><ChevronDown /></Button>
                    </span>
                    <section id={note.id} className="w-full h-auto flex flex-col items-start justify-center gap-2 transition-transform duration-300 ease-in-out">
                        <p className="text-justify">{note.text}</p>
                    </section>
                </div>
            ))}
        </div>
    )
}