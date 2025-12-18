'use client';
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, CirclePlus, Notebook, DiamondMinus } from "lucide-react";
import { Card } from "@/components/utils/card.jsx";
import axios from "axios";

export function Board({ user, setAddNewBoard, setActiveListId, activeBoardId, setActiveBoardId, setNotice, boards, fetchBoards }) {
    let activeBoard = boards.find(b => b._id === activeBoardId) || [];

    useEffect(() => {
        fetchBoards();
    }, []);

    if (user.boards.length <= 0 || user.boards === null || user.boards === undefined) {
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

    const handleRemoveBoard = async (boardId) => {
        try {
            await axios.patch("/api/user/remove-board", { boardId });
            setActiveBoardId(null);
            setActiveListId(null);
            fetchBoards();
            setNotice("Board removed successfully");
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

    const handleRemoveList = async (listId) => {
        try {
            setActiveListId(null);
            await axios.patch("/api/user/remove-list", { listId, activeBoardId });
            fetchBoards();
            setNotice("List removed successfully");
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

    if (activeBoardId === null) {
        return (
            <div className="w-full h-auto columns-3 max-[750px]:columns-2 max-[400px]:columns-1">
                {
                    boards.map((b) => (
                        <div key={b._id} onClick={() => setActiveBoardId(b._id)} className="break-inside-avoid mb-4 w-full h-auto p-4 rounded-md border border-gray-400 bg-gray-300 dark:bg-gray-900 shadow-sm">
                            <span className="w-full flex flex-row items-start justify-between">
                                <span>
                                    <h1>{b.title}</h1>
                                    <p className="text-xs">{b.lists.length} Lists</p>
                                </span>
                                <Button onClick={() => handleRemoveBoard(b._id)} className="hover:bg-gray-300" variant="ghost"><DiamondMinus /></Button>
                            </span>
                            <p className="text-xs mt-2">Created at: {b.createdAt}</p>
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
        <div className="w-full h-auto columns-3 max-[990px]:columns-2 max-[670px]:columns-1">
            {activeBoard.lists && activeBoard.lists.map((list) => (
                <div key={list._id} className="break-inside-avoid mb-4 w-full h-auto p-4 rounded-md border border-gray-400 bg-gray-300 dark:bg-gray-900 shadow-sm">
                    <span className="w-full flex flex-row items-start justify-between mb-4">
                        <span>
                            <h1 className="font-bold">{list.title.substring(0, 15)}</h1>
                            <p className="text-xs">{list.cards.length} cards</p>
                        </span>
                        <span className="flex flex-row items-center justify-center flex-nowrap">
                            <Button onClick={() => handleRemoveList(list._id)} className="hover:bg-gray-300" variant="ghost"><DiamondMinus /></Button>
                            <Button onClick={() => handleShow(list._id)} className="hover:bg-gray-300" variant="ghost"><ChevronDown /></Button>
                        </span>
                    </span>
                    <section id={list._id} className="w-full h-auto flex flex-col items-center justify-center gap-2 transition-transform duration-300 ease-in-out">
                        <Card list={list} setNotice={setNotice} boardId={activeBoard._id} fetchBoards={fetchBoards} />
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