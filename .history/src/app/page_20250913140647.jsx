'use client';
import { useState } from 'react';
import { useBoard } from '@/app/context/BoardContext';
import Link from 'next/link';

export default function Home() {
  const { boardList, setBoardList } = useBoard();
  const [boardBox, setBoardBox] = useState(false);
  const [title, setTitle] = useState('');
  const [bg, setBg] = useState("#616060");
  const [text, setText] = useState('#f5f2f2');

  const handleNewBoard = (e) => {
    e.preventDefault();
    const newBoard = { id: Date.now().toString(), title, bg, text, lists: [] };
    setBoardList([...boardList, newBoard]);
    setTitle('');
    setBg("#616060");
    setText('#f5f2f2');
    setBoardBox(false);
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
        {boardBox && (
          <form onSubmit={handleNewBoard} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#b32509] p-6 rounded-md shadow-lg">
            <input
              type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="border-2 p-2 rounded-md w-[12rem] border-gray-800/50 focus:outline-none focus:ring-0"
              placeholder="Enter board title" required
            />
            <div className="flex flex-row w-[100%] items-center justify-between mt-2">
              <input
                type="color" value={bg} onChange={(e) => setBg(e.target.value)}
                className="p-[0.25rem] cursor-pointer rounded-md w-20 h-10 shadow-sm hover:scale-105"
                title="Pick a background color"
              />
              <input
                type="color" value={text} onChange={(e) => setText(e.target.value)}
                className="p-[0.25rem] cursor-pointer rounded-md w-20 h-10 shadow-sm hover:scale-105"
                title="Pick a text color"
              />
            </div>
            <div className="w-[100%] mt-4 flex flex-row justify-between items-center">
              <button
                onClick={() => setBoardBox(false)}
                className="px-4 py-[0.35rem] bg-[#b32509] hover:shadow-sm hover:scale-95 hover:shadow-gray-300 rounded-md cursor-pointer font-semibold shadow-sm transition-all duration-300"
              >
                Cancel
              </button>
              <button type="submit"
                className="px-4 py-[0.35rem] bg-[#b32509] hover:shadow-sm hover:scale-105 hover:shadow-gray-300 rounded-md cursor-pointer font-semibold text-white shadow-md transition-all duration-300"
              >
                Create
              </button>
            </div>
          </form>
        )}
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
              <Link key={board.id} href={`/${board.id}`}>
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
