'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import MainHeader from '@/components/mainHeader';

export default function Home() {
  const [boardBox, setBoardBox] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [greeting, setGreeting] = useState(true);

  useEffect(() => {
    const storedBoards = localStorage.getItem('boards') || '[]';
    setBoardList(JSON.parse(storedBoards));
  }, []);

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
      <section className="w-[100%] flex flex-row justify-between items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-[1rem] px-6 shadow-lg select-none backdrop-blur-sm border-b-2 border-white/20" >
        <MainHeader boardBox={boardBox} setBoardBox={setBoardBox} />
      </section>
      <BoxDialogBox boardBox={boardBox} setBoardBox={setBoardBox} boardList={boardList} setBoardList={setBoardList} />
      <BoxArea boardList={boardList} setBoardList={setBoardList} greeting={greeting} />
    </>
  );
}
