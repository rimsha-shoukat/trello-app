'use client';
import { useState, useEffect } from 'react';
import BoxDialogBox from '@/components/boxDialogBox';
import BoxArea from '@/components/boxArea';

export default function Home() {
  const boardList = [];
  const [boardBox, setBoardBox] = useState(false);
  console.log(boardList);

  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boardList));
  }, [boardList]);

  return (
    <>
      <section className="w-[100%] flex flex-row justify-between items-center bg-[#b32509] py-[0.6rem] px-4 shadow-md select-none">
        <h1 className="text-white text-[2rem] font-bold">Trello</h1>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => setBoardBox(!boardBox)}
            className="py-2 px-4 bg-[#b32509] hover:shadow-sm hover:scale-105 hover:shadow-gray-300 rounded-md cursor-pointer font-semibold text-white shadow-md transition-all duration-300"
          >
            + Board
          </button>
        </div>
        <BoxDialogBox boardBox={boardBox} setBoardBox={setBoardBox} boardList={boardList}/>
      </section>
      <BoxArea boardList={boardList}/>
      
    </>
  );
}
