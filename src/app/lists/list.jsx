import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, CirclePlus, Notebook } from "lucide-react";
import { Card } from "@/components/card";

export function List(){
    const[list, setList] = useState([]);

    if(list.length <= 0){
        return (
            <div className="break-inside-avoid mb-4 flex flex-col items-center justify-center gap-4 w-[100%] h-auto">
                <h1>No Boards Yet!</h1>
                <p>You haven&apos;t created any boards yet. Get started by creating
            your first board.</p>
                <Button>Create Board</Button>
            </div>
        )
    }

    return (
        <div className="break-inside-avoid mb-4 w-[100%] h-auto p-4 rounded-md border-1 border-gray-400 bg-gray-300 dark:bg-gray-900 shadow-sm">
            <span className="w-[100%] flex flex-row items-center justify-between mb-4">
                <span>
                    <h1>List Name</h1>
                    <p>5</p>
                </span>
                <Button variant="ghost"><ChevronDown /></Button>
            </span>
            <section className="w-[100%] h-auto flex flex-col items-center justify-center gap-2">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </section>
            <span className="w-[100%] flex flex-row items-center justify-between p-2 mt-4">
                <p className="text-xs">Created at: 01/04</p>
                <Button className="bg-gray-200/50 dark:bg-gray-800" variant="outline">
                    <CirclePlus/>
                </Button>
            </span>
        </div>
    )
}