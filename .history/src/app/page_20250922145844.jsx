'use client';
import { useState, useEffect } from 'react';
import MainHeader from '@/components/mainHeader';
import BoxDialogBox from '@/components/boxDialogBox';
import BoxArea from '@/components/boxArea';

export default function Home() {
  const [boardBox, setBoardBox] = useState(false);
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    const storedBoards = localStorage.getItem('boards') || '[]';
    setBoardList(JSON.parse(storedBoards));
  }, [board]);

  return (
    <>
      <section className="w-[100%] flex flex-row justify-between items-center bg-[#333231] py-[0.6rem] px-4 shadow-md select-none">
        <MainHeader boardBox={boardBox} setBoardBox={setBoardBox} />
        <BoxDialogBox boardBox={boardBox} setBoardBox={setBoardBox} boardList={boardList} setBoardList={setBoardList} />
      </section>
      <BoxArea boardList={boardList} setBoardList={setBoardList} />
    </>
  );
}
