"use client";
import React from "react";
import axios from "axios";

export function Card({ list, setNotice, boardId }) {
    const handleCardUpdate = async (cardId) => {
        let value = document.querySelector(`div[key='${cardId}'] textarea`).value;
        try {
            await axios.patch("/api/user/update-card", { text: value, cardId, listId: list._id, boardId });
            setNotice("Card updated successfully!");
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
            <div key={card._id} disabled={card.complete} onClick={() => handleCardUpdate(card._id)} className="w-full h-auto flex flex-row items-center justify-start gap-4 border border-gray-400 rounded-md p-2 bg-gray-400/50 dark:bg-gray-950/50 shadow-sm">
                <input onClick={() => handleCheck(card._id, card.complete)} type="checkbox" checked={card.complete} />
                <textarea className={`${card.complete ? "line-through" : ""} text-justify`}>{card.text}</textarea>
            </div>
        ))
    )
}