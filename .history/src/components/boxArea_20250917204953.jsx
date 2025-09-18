'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CiEdit } from "react-icons/ci";

export default function BoxArea({ boardList, setBoardList }) {

  const[greeting, setGreeting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGreeting(false);
    }, 9000);
    return () => {
      clearTimeout(timer);
    }
  },[]);

  useEffect(() => {
    const storedBoards = localStorage.getItem('boards') || '[]';
    setBoardList(JSON.parse(storedBoards));
  }, []);

  return (
    <section className="select-none text-[#333231] w-[100%] h-[100%] flex flex-col items-center justify-center mt-6">
      <h1 className={`${greeting ? 'block' : 'hidden'} font-bold text-[3rem]`}>Welcome to Trello!</h1>
      {
        boardList && Array.isArray(boardList) && boardList.length === 0 ? (
          <p className="font-bold text-[1rem]">No Board created Yet!</p>
        ) : (
          <section style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
            className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-2 gap-8 items-start justify-start overflow-x-auto overflow-y-hidden px-[2rem] ">
            {boardList.map(board => (
            <div key={board.id} className="relative w-[20rem] h-[12rem]">
              <CiEdit style={{ color: board.text }} className="absolute text-[1.5rem] cursor-pointer top-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300"/>
              <Link key={board.id} href={`/boards/${board.id}`}>
                <div style={{ backgroundColor: board.bg }} className={`w-[20rem] h-[12rem] p-4 border-none flex items-center justify-center overflow-hidden rounded-md shadow-md`}>
                  <h1 style={{ color: board.text }} className="text-[2rem] leading-7">{board.title}</h1>
                </div>
              </Link>
            </div>
            ))}
          </section>
        )}
    </section>
  )
}