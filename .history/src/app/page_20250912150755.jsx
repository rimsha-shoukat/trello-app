'use client';
import { useState } from 'react';
import Board from "@/components/board";

export default function Home() {
  const [boardList, setBoardList] = useState([]);
  const [boardBox, setBoardBox] = useState(false);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState("#cacaca");
  const [description, setDescription] = useState('');

  const handleNewBoard = (e) => {
    e.preventDefault();
    const newBoard = { title : title, color: color, description: description };
    const newBoardList([...boardList, newBoard]);
    setTitle('');
    setColor("#cacaca");
    setDescription('');
    setBoardBox(false);
    console.log(boardList);
  }

  return (
    <>
      <navbar className="w-[100%] flex flex-row justify-between items-center bg-[#b32509] py-[0.6rem] px-4 shadow-md select-none">
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
          <form onSubmit={ handleNewBoard } className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#b32509] p-6 rounded-md shadow-lg">
            <div className="flex flex-row items-center justify-between gap-2">
              <input
                type="text" value={ title } onChange={ (e) => setTitle(e.target.value) }
                className="border-2 p-2 rounded-md w-[14rem] border-gray-800/50 focus:outline-none focus:ring-0"
                placeholder="Enter board title" required
              />
              <input
                type="color" value={ color } onChange={ (e) => setColor(e.target.value) }
                className="p-[0.25rem] cursor-pointer rounded-md w-10 h-10 shadow-sm hover:scale-105"
                title="Pick a color"
              />
            </div>
            <textarea
              rows="3" value={ description } onChange={ (e) => setDescription(e.target.value) }
              className="mt-2 w-[100%] p-2 rounded-md border-2 border-gray-800/50 focus:outline-none focus:ring-0"
              placeholder="description (optional...)"
            />
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
      </navbar>

      <div className="select-none text-[#b32509] w-[100%] h-[100%] flex flex-col items-center justify-center mt-6">
        <h1 className="font-bold text-[3rem]">Welcome to Trello!</h1>
        {boardList.length === 0 ? (
          <p className="font-bold text-[1rem]">No Board created Yet!</p>
        ) : (
          <Board boardList={ boardList } />
        )}
      </div>
    </>
  );
}
