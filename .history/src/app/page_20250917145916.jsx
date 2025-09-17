'use client';
import { useState, useEffect } from 'react';
import BoxDialogBox from '@/components/boxDialogBox';
import BoxArea from '@/components/boxArea';

export default function Home() {
  const [boardBox, setBoardBox] = useState(false);
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    const storedBoards = localStorage.getItem('boards') || '[]';
    setBoardList(JSON.parse(storedBoards));
  }, []);

  return (
    <>
      <section className="w-[100%] flex flex-row justify-between items-center bg-[#333231] py-[0.6rem] px-4 shadow-md select-none">
        <h1 className="text-white text-[2rem] font-bold">Trello</h1>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => setBoardBox(!boardBox)}
            className="py-2 px-4 bg-[#333231] hover:shadow-sm hover:scale-105 hover:shadow-gray-300 rounded-md cursor-pointer font-semibold text-white shadow-md transition-all duration-300"
          >
            + Board
          </button>
        </div>
        <BoxDialogBox boardBox={boardBox} setBoardBox={setBoardBox} boardList={boardList} setBoardList={setBoardList} />
      </section>
      <BoxArea boardList={boardList} setBoardList={setBoardList} />
    </>
  );
}
