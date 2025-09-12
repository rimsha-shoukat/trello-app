'use client';
import { useState } from 'react';
import Board from "@/components/board";

export default function Home() {
const [boardBox, setBoardBox] = useState(false);
  return (
    <>
      <navbar className="w-[100%] flex flex-row justify-between items-center bg-[#b32509] py-[0.6rem] px-4 shadow-md select-none">
          <h1 className="text-white text-[2rem] font-bold">Trello</h1>
          <div className="flex flex-row gap-4">
            <button onClick={() => setBoardBox(!boardBox)} className="py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ Board</button>
          </div>
          {
            boardBox && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#b32509] p-2 rounded-md">
              <div className="flex flex-row items-center justify-between gap-4">
                <input type="text" className="p-2 rounded-md w-[12rem]" placeholder="Enter board title" />
                <input type="color" className="rounded-full w-4 h-4" />
              </div>
              <div className="w-[100%] mt-2 flex flex-row justify-between items-center">
                <button className="px-4 py-2 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">cancel</button>
                <button className="px-4 py-2 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">create</button>
              </div>
            </div>
          }
          
        </navbar>
  
      <div className="select-none text-[#b32509] w-[100%] h-[100%] flex flex-col items-center justify-center mt-6">
        <h1 className="font-bold text-[3rem]">Welcome to Trello!</h1>
        {boardList.length === 0 ?
          <p className="font-bold text-[1rem]">No Board created Yet!</p>
          : <Board />
        }
      </div>
    </>
  );
}