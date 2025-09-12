'use client';
import { useState } from 'react';
import Board from "@/components/board";

export default function Home() {
  const boardList = [];
  const [boardBox, setBoardBox] = useState(false);

  return (
    <>
      <navbar className="w-[100%] flex flex-row justify-between items-center bg-[#b32509] py-[0.6rem] px-4 shadow-md select-none">
        <h1 className="text-white text-[2rem] font-bold">Trello</h1>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => setBoardBox(!boardBox)}
            className="py-2 px-4 bg-[#b32509] hover:text-white/50 rounded-md cursor-pointer font-semibold text-white shadow-md transition-colors duration-300"
          >
            + Board
          </button>
        </div>
        {boardBox && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#b32509] p-6 rounded-md shadow-lg">
            <div className="flex flex-row items-center justify-between gap-2">
              <input
                type="text"
                className="border-2 p-2 rounded-md w-[14rem] border-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#b32509]"
                placeholder="Enter board title"
              />
              <input
                type="color"
                className="cursor-pointer rounded-full w-12 h-12 shadow-sm"
                title="Pick a color"
              />
            </div>
            <textarea
              rows="3"
              className="mt-2 w-[100%] p-2 rounded-md border-2 border-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#b32509]"
              placeholder="description (optional...)"
            />
            <div className="w-[100%] mt-4 flex flex-row justify-between items-center">
              <button
                onClick={() => setBoardBox(false)}
                className="px-4 py-[0.35rem] bg-gray-400/50 hover:bg-gray-500/50 rounded-md cursor-pointer font-semibold shadow-sm transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                className="px-4 py-[0.35rem] bg-[#b32509] hover:bg-[#b32509]/60 rounded-md cursor-pointer font-semibold text-white shadow-md transition-colors duration-300"
              >
                Create
              </button>
            </div>
          </div>
        )}
      </navbar>

      <div className="select-none text-[#b32509] w-[100%] h-[100%] flex flex-col items-center justify-center mt-6">
        <h1 className="font-bold text-[3rem]">Welcome to Trello!</h1>
        {boardList.length === 0 ? (
          <p className="font-bold text-[1rem]">No Board created Yet!</p>
        ) : (
          <Board />
        )}
      </div>
    </>
  );
}
