'use client';
import { useState } from 'react';
import { useBoard } from '../../context/BoardContext';
import { useParams } from 'next/navigation';

function Card(cards){
  return(
       <h1>card</h> 
  )
}

export default function Boards(){
  const { boardList, setBoardList } = useBoard();
  const params = useParams();
  const boardId = params.boards;
  const board = boardList.find(b => b.id === boardId);

  const [listBox, setListBox] = useState(false);
  const [title, setTitle] = useState('');
  const [bg, setBg] = useState('#616060');
  const [text, setText] = useState('#f5f2f2');

  const handleNewList = (e) => {
    e.preventDefault();
    const newList = { id: Date.now().toString(), title : title, bg: bg, text: text, card : [] };
    const updatedBoards = boardList.map(b => {
      if (b.id === boardId) {
        return { ...b, lists: [...b.lists, newList] };
      }
      return b;
    });
    setBoardList(updatedBoards);
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
        <section style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}
                className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-1 gap-8 items-start justify-start overflow-x-auto overflow-y-hidden px-[2rem]">
        {board.lists.length === 0 ? (
          <h2 className="text-[1.2rem] mt-4">No lists added yet!</h2>
        ) : (
            board.lists.map(list => (
                    <div key={list.id} style={{ backgroundColor: list.bg }} className={`w-[24rem] h-auto p-4 border-none flex items-center justify-center overflow-hidden rounded-md shadow-md`}>
                        <h1 style={{ color: list.text }} className="text-[1.2rem] leading-7">{list.title}</h1>
                        {!list.card.length === 0 && <Card cards={list.card}/>}
                    </div>
                ))
            )
        }
      </section>
        </>
    )
}