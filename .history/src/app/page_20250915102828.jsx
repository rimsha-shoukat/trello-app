'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const { boardList, setBoardList } = useBoard(;
  const [boardBox, setBoardBox] = useState(false);
  const [title, setTitle] = useState('');
  const [bg, setBg] = useState("#616060");
  const [text, setText] = useState('#f5f2f2');

  const handleNewBoard = (e) => {
    e.preventDefault();
    const newBoard = { id: Date.now().toString(), title: title, bg: bg, text: text, lists: [] };
    setBoardList([...boardList, newBoard]);
    setTitle('');
    setBg("#616060");
    setText('#f5f2f2');
    setBoardBox(false);
    localStorage.setItem('boards', JSON.stringify(boardList));
  }

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
        
      </section>

      <section className="select-none text-[#b32509] w-[100%] h-[100%] flex flex-col items-center justify-center mt-6">
        <h1 className="font-bold text-[3rem]">Welcome to Trello!</h1>
        {
        boardList.length === 0 ? (
          <p className="font-bold text-[1rem]">No Board created Yet!</p>
        ) : (
          <section style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
            className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-2 gap-8 items-start justify-start overflow-x-auto overflow-y-hidden px-[2rem] ">
            {boardList.map(board => (
              <Link key={board.id} href={`/boards/${board.id}`}>
                <div style={{ backgroundColor: board.bg }} className={`w-[20rem] h-[12rem] p-4 border-none flex items-center justify-center overflow-hidden rounded-md shadow-md`}>
                    <h1 style={{ color: board.text }} className="text-[2rem] leading-7">{board.title}</h1>
                </div>
              </Link>
            ))}
          </section>
        )}
      </section>
    </>
  );
}
