'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, CirclePlus, Notebook } from "lucide-react";
import { Card } from "@/components/utils/card.jsx";

export function Board({ user, setAddNewBoard, setActiveListId, activeBoardId, setActiveBoardId, setNotice, boards, setBoards }) {
    let activeBoard = boards.find(b => b._id === activeBoardId) || null;

    const fetchBoards = async () => {
        try {
            let res = await axios.get("/api/user/get-boards");
            setBoards(res.data || null);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }

    useEffect(() => {
        fetchBoards();
    }, [user]);

    if (user.boards.length <= 0) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <div className="break-inside-avoid flex flex-col items-center justify-center gap-4">
                    <Notebook />
                    <h1>No Boards Yet!</h1>
                    <p>You haven&apos;t created any boards yet. Get started by creating
                        your first board.</p>
                    <Button onClick={() => { setAddNewBoard(true); }}>Create Board</Button>
                </div>
            </div>
        )
    }

    if (activeBoardId === null) {
        return (
            <div className="w-full h-auto columns-3">
                {
                    boards.map((b) => (
                        <div key={b._id} onClick={setActiveBoardId(b._id)} className="break-inside-avoid mb-4 w-full h-auto p-4 rounded-md border border-gray-400 bg-gray-300 dark:bg-gray-900 shadow-sm">
                            <span>
                                <h1>{b.title}</h1>
                                <p>{b.lists.length} Lists</p>
                            </span>
                            <p className="text-xs">Created at: {b.createdAt}</p>
                        </div>
                    ))
                }
            </div>
        )
    }

    const handleShow = (id) => {
        let list = document.getElementById(id);
        list.style.display = list.style.display === "none" ? "block" : "none";
    }

    return (
        <div className="w-full h-auto columns-3">
            {activeBoard.lists.map((list) => (
                <div key={list._id} className="break-inside-avoid mb-4 w-full h-auto p-4 rounded-md border border-gray-400 bg-gray-300 dark:bg-gray-900 shadow-sm">
                    <span className="w-full flex flex-row items-center justify-between mb-4">
                        <span>
                            <h1>{list.name}</h1>
                            <p>{list.cards.length} Cards</p>
                        </span>
                        <Button onClick={() => handleShow(list._id)} variant="ghost"><ChevronDown /></Button>
                    </span>
                    <section id={list._id} className="w-full h-auto flex flex-col items-center justify-center gap-2">
                        <Card list={list} setNotice={setNotice} boardId={activeBoard._id} />
                    </section>
                    <span className="w-full flex flex-row items-center justify-between p-2 mt-4">
                        <p className="text-xs">Created at: {list.createdAt}</p>
                        <Button className="bg-gray-200/50 dark:bg-gray-800" variant="outline">
                            <CirclePlus onClick={() => setActiveListId(list._id)} />
                        </Button>
                    </span>
                </div>
            ))}
        </div>
    )
}