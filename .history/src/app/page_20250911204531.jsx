'use client';
import { useState } from 'react';
import Board from "@/components/board";

export default function Home() {
  const [boardList, setBoardList] = useState([]);
  const [newBoard, setNewBoard] = useState(tr);

  const createBoard = () => {
    setNewBoard(!newBoard);
  }

  return (
    <>
      <navbar className="w-[100%] flex flex-row justify-between items-center bg-[#b32509] py-[0.6rem] px-4 shadow-md select-none">
        <h1 className="text-[2rem] font-bold">Trello</h1>
        <button onClick={() => createBoard} className="py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ Board</button>
        {
        newBoard && <div className="absolute top-[4.5rem] w-[12rem] right-[0.5rem] bg-[#b32509] p-4 rounded-md">
            <h1>new board created!</h1>
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