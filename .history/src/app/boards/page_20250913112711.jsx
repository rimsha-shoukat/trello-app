import List from "@/components/list";

export default function Boards(){
    return (
        <>
        <h1 className="mt-6 text-[3rem] font-bold text-[#b32509]">Board Name</h1>
        <List/>
        </>
    )
}


'use client';
import { useState } from 'react';

export default function BoardsLayout({ children }){
  const [listBox, setListBox] = useState(false);
  const [title, setTitle] = useState('');
  const [bg, setBg] = useState('#616060');
  const [text, setText] = useState('#f5f2f2');

  const handleNewList = (e) => {
    e.preventDefault();
    const newList = { id: Date.now(), title: title, bg: bg, text: text };
    const newListArray = [...listBox, newList];
    setListBox(newListArray);
    setTitle('');
    setBg('#616060');
    setText('#f5f2f2');
    setListBox(false);
  }
    return (
        <>
        <section className="w-[100%] flex flex-row justify-between items-center bg-[#b32509] py-[0.6rem] px-4 shadow-md select-none">
          <h1 className="text-white text-[2rem] font-bold">Trello</h1>
          <div className="flex flex-row gap-4">
            <button onClick={() => setListBox(!listBox)} className="py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ List</button>
          </div>
          
          {listBox && (
          <form onSubmit={handleNewList} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#b32509] p-6 rounded-md shadow-lg">
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
                onClick={() => setListBox(false)}
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
        { children }
        </>
    )
}