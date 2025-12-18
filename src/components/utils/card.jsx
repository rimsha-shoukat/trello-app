"use client";
import React, { useState } from "react";
import axios from "axios";
import { CloudCheck, DiamondMinus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Card({ list, setNotice, boardId, fetchBoards }) {
    const [isEditing, setIsEditing] = useState(null);

    const handleCardUpdate = async (cardId) => {
        let value = document.querySelector(`div[id='${cardId}'] textarea`).value;

        try {
            await axios.patch("/api/user/update-card", { text: value, cardId, listId: list._id, boardId });
            setNotice("Card updated successfully!");
            setIsEditing(null);
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

    const handleCheck = async (cardId, currentCheck) => {
        let check = !currentCheck;

        try {
            await axios.patch("/api/user/check-card", { check, cardId, listId: list._id, boardId });
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
            setNotice(errorMessage);
        }
    };

    return (
        list.cards.map((card) => (
            <div id={card._id} key={card._id} className={`w-full h-auto flex flex-row items-center justify-start gap-2 border border-gray-400 rounded-md p-2 bg-gray-400/50 dark:bg-gray-950/50 shadow-sm mb-2 ${card.complete ? "opacity-50" : ""}`}>
                <input onChange={() => handleCheck(card._id, card.complete)} type="checkbox" checked={card.complete} />
                <textarea disabled={card.complete} rows="1" onClick={() => setIsEditing(card._id)} className={`${card.complete ? "line-through" : ""} text-justify w-full p-2`} defaultValue={card.text || "Null"} />
                {isEditing === card._id ? (
                    <Button onClick={() => handleCardUpdate(card._id)} className="hover:bg-gray-300" variant="ghost"><CloudCheck /></Button>
                ) : (
                    <Button className="hover:bg-gray-300" variant="ghost"><DiamondMinus /></Button>
                )}
            </div>
        ))
    )
}