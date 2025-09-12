'use client';
import { useState } from 'react';
import Board from "@/components/board";

export default function Home() {
  const [boardList, setBoardList] = useState([]);
  const [newBoard, setNewBoard] = useState(false);

  return (
    <>
      
  
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