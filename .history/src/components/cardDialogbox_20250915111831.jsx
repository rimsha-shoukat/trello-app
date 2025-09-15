'use client';
import { useState } from 'react';


export default function cardDialogBox({ newCard, setNewCard }) {
    const [card, setCard] = useState('');
    const [cardBg, setCardBg] = useState('');
    const [cardColor, setCardColor] = useState('');

    const handleNewCard = (e) => {
  e.preventDefault();
}

    return (
        <>
            {
                newCard && (
                    <form onSubmit={handleNewCard} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#b32509] p-6 rounded-md shadow-lg">
                        <h1 className="text-[1.2rem] font-semibold">Add new card</h1>
                        <textarea type="text" rows='3' value={card} onChange={(e) => setCard(e.target.value)} placeholder="Enter card details..." className="w-[12rem] border-2 border-gray-800/50 focus:outline-none focus:ring-0" />
                        <div className="flex flex-row w-[100%] items-center justify-between mt-2">
                            <input
                                type="color" value={cardBg} onChange={(e) => setCardBg(e.target.value)}
                                className="p-[0.25rem] cursor-pointer rounded-md w-20 h-10 shadow-sm hover:scale-105"
                                title="Pick a background color"
                            />
                            <input
                                type="color" value={cardColor} onChange={(e) => setCardColor(e.target.value)}
                                className="p-[0.25rem] cursor-pointer rounded-md w-20 h-10 shadow-sm hover:scale-105"
                                title="Pick a text color"
                            />
                        </div>
                        <div className="flex flex-row w-[100%] items-center justify-between mt-2">
                            <button
                                onClick={() => setNewCard(false)}
                                className="px-4 py-[0.35rem] bg-[#b32509] hover:shadow-sm hover:scale-95 hover:shadow-gray-300 rounded-md cursor-pointer font-semibold shadow-sm transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button type="submit"
                                className="px-4 py-[0.35rem] bg-[#b32509] hover:shadow-sm hover:scale-105 hover:shadow-gray-300 rounded-md cursor-pointer font-semibold text-white shadow-md transition-all duration-300"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                )
            }
        </>
    )
}