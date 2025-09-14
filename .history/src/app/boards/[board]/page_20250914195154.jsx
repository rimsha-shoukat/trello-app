'use client';
import { useState } from 'react';
import { useBoard } from '@/app/context/BoardContext.jsx';
import { useParams } from 'next/navigation';

function Card(cards) {
  return (
    <h1>card</h1>
  );
}



export default function Boards() {
  const { boardList, setBoardList } = useBoard();
  const params = useParams();
  const boardId = params.board;
  const board = boardList.find(b => b.id === boardId);

  const [listBox, setListBox] = useState(false);
  const [title, setTitle] = useState('');
  const [bg, setBg] = useState('#616060');
  const [text, setText] = useState('#f5f2f2');

  const handleNewList = (e) => {
    e.preventDefault();
    const newList = { id: Date.now().toString(), title: title, bg: bg, text: text, card: [] };
    const updatedBoards = boardList.map(b => {
      if (b.id === boardId) {
        return { ...b, lists: Array.isArray(b.lists) ? [...b.lists, newList] : [newList] };
      }
      return b;
    });
    setBoardList(updatedBoards);
    localStorage.setItem('boards', JSON.stringify(updatedBoards));
    setTitle('');
    setBg('#616060');
    setText('#f5f2f2');
    setListBox(false);
  }

const addNewCard = (listId) => {
  const newCard = { id: Date.now().toString(), title: '', description: ''};
  const updatedBoards = board.lists.map(list => {
    if (list.id === listId) {
      return { ...list, card: Array.isArray(list.card) ? [...list.card, newCard] : [newCard] };
    }
  });
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
      <section
        className="mt-6 w-[100%] h-auto">
        {board.lists && Array.isArray(board.lists) && board.lists.length === 0 ? (
          <h2 className="text-[1.2rem] text-[#b32509]">No lists added yet!</h2>
        ) : (
          <>
            <h1 className="text-[2.2rem] px-[2rem] text-[#b32509] font-bold">{board.title}</h1>
            <div
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-1 gap-8 items-start justify-start overflow-x-auto overflow-y-hidden px-[2rem]">
              {board.lists && Array.isArray(board.lists) && board.lists.map(list => (
                <div key={list.id} style={{ backgroundColor: list.bg }} className={`w-[24rem] h-auto p-4 border-none flex flex-col items-center justify-center overflow-hidden rounded-md shadow-md`}>
                  <h1 style={{ color: list.text }} className="text-[1.2rem] leading-7 mb-2">{list.title}</h1>
                  {list.card && Array.isArray(list.card) && list.card.length > 0 && <Card cards={list.card} />}
                  <button onClick={ () => addNewCard(list.id) } className="w-[100%] hover:scale-105 rounded-md cursor-pointer font-semibold text-[#b32509] py-[0.3rem] bg-gray-400 hover:bg-gray-300/60 shadow-md transition-all duration-300">+ card</button>
                </div>
              ))
              }
            </div>
          </>
        )
        }
      </section>
    </>
  )
}