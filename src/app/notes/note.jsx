'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Notebook } from "lucide-react";

export function Note({ setAddNewTitle }) {
    const [notes, setNotes] = useState([]);

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

    return (
        <div className="w-full h-auto columns-2">
            <div className="break-inside-avoid mb-4 w-full h-auto p-4 rounded-md border border-gray-400 bg-gray-400 dark:bg-gray-900 shadow-sm">
                <span className="w-full flex flex-row items-center justify-between mb-4">
                    <span>
                        <h1>Note Name</h1>
                        <p className="text-xs">Created at: 01/04</p>
                    </span>
                    <Button variant="ghost"><ChevronDown /></Button>
                </span>
                <section className="w-full h-auto flex flex-col items-start justify-center gap-2">
                    <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eaque nesciunt iusto, voluptas iure corporis quod, repellendus consequuntur repellat fuga, beatae sed voluptatem? Voluptas incidunt, impedit laborum accusantium possimus cupiditate!
                        Delectus odio tenetur architecto hic, nesciunt quod, voluptates libero animi, rem praesentium quos sapiente distinctio. Quam rerum quo, voluptatem sunt perferendis, accusantium nulla voluptate veniam adipisci aspernatur cupiditate rem voluptatum.
                        Saepe tenetur quasi iste sit numquam, sunt accusantium natus neque hic a corporis officia in molestiae dolor dolore vero? Iste tempore laudantium porro totam. Quos commodi sapiente saepe quas quo!</p>
                </section>
            </div>
        </div>
    )
}