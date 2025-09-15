'use client';
import { useState } from 'react';

export default function boxDialogBox({ boardBox, setBoardBox, boardList, setBoardList }) {
    const [title, setTitle] = useState('');
    const [bg, setBg] = useState("#616060");
    const [text, setText] = useState('#f5f2f2');

    const handleNewBoard = (e) => {
    e.preventDefault();
    const newBoard = { id: Date.now().toString(), title: title, bg: bg, text: text, lists: [] };
        localStorage.setItem('boards', JSON.stringify([...boardList, newBoard]));
    setTitle('');
    setBg("#616060");
    setText('#f5f2f2');
    setBoardBox(false);
  }


    return (
        <>
            {boardBox && (
                <form onSubmit={handleNewBoard} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#b32509] p-6 rounded-md shadow-lg">
                    <input
                        type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                        className="border-2 p-2 rounded-md w-[12rem] border-gray-800/50 focus:outline-none focus:ring-0"
                        placeholder="Enter board title" required
                    />
                    <div className="flex flex-row w-[100%] items-center justify-between mt-2">
                        <input
                            type="color" value={bg} onChange={(e) => setBg(e.target.value)}
                            className="p-[0.25rem] cursor-pointer rounded-md w-20 h-10 shadow-sm hover:scale-105"
                            title="Pick a background color"
                        />
                        <input
                            type="color" value={text} onChange={(e) => setText(e.target.value)}
                            className="p-[0.25rem] cursor-pointer rounded-md w-20 h-10 shadow-sm hover:scale-105"
                            title="Pick a text color"
                        />
                    </div>
                    <div className="w-[100%] mt-4 flex flex-row justify-between items-center">
                        <button
                            onClick={() => setBoardBox(false)}
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
            )}
        </>
    )

}