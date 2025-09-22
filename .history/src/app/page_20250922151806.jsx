'use client';
import { useState, useEffect } from 'react';
import MainHeader from '@/components/mainHeader';
import BoxArea from '@/components/boxArea';
//lazy load comp

export default function Home() {
  const [boardBox, setBoardBox] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [greeting, setGreeting] = useState(true);

  useEffect(() => {
    const storedBoards = localStorage.getItem('boards') || '[]';
    setBoardList(JSON.parse(storedBoards));
  }, [boardList]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGreeting(false);
    }, 9000);
    return () => {
      clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <section className="w-[100%] flex flex-row justify-between items-center bg-[#333231] py-[0.6rem] px-4 shadow-md select-none">
        <MainHeader boardBox={boardBox} setBoardBox={setBoardBox} />
        <BoxDialogBox boardBox={boardBox} setBoardBox={setBoardBox} boardList={boardList} setBoardList={setBoardList} />
      </section>
      <BoxArea boardList={boardList} setBoardList={setBoardList} greeting={greeting} />
    </>
  );
}
