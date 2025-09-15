'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import ListDialogBox from '@/components/listDialogBox';
import ListArea from '@/components/listArea';

export default function Boards() {
  const params = useParams();
  const boardId = params.board;
  const boardList = JSON.parse(localStorage.getItem('boards'));
  const board = boardList.find(b => b.id === boardId);
  const [listBox, setListBox] = useState(false);

  const [newCard, setNewCard] = useState(false);
  const [card, setCard] = useState('');
  const [cardBg, setCardBg] = useState('');
  const [cardColor, setCardColor] = useState('');

  

const handleNewCard = (e) => {
  e.preventDefault();
}

  return (
    <>
      <section className="w-[100%] flex flex-row justify-between items-center bg-[#b32509] py-[0.6rem] px-4 shadow-md select-none">
        <h1 className="text-white text-[2rem] font-bold">Trello</h1>
        <div className="flex flex-row gap-4">
          <button onClick={() => setListBox(!listBox)} className="py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ List</button>
        </div>
        <ListDialogBox listBox={listBox} setListBox={setListBox} boardList={boardList} boardId={boardId} />
        

        {
          newCard && (
            <form onSubmit={handleNewCard} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#b32509] p-6 rounded-md shadow-lg">
              <h1 className="text-[1.2rem] font-semibold">Add new card</h1>
              <textarea type="text" rows='3' value={card} onChange={(e) => setCard(e.target.value)} placeholder="Enter card details..." className="w-[12rem] border-2 border-gray-800/50 focus:outline-none focus:ring-0" />
              <div className="flex flex-row w-[100%] items-center justify-between mt-2">
              <input
                type="color" value={cardBg} onChange={(e) => setCardBg(e.target.value)}
                className="p-[0.25rem] cursor-pointer rounded-md w-20 h-10 shadow-sm hover:scale-105"
                title="Pick a background color"
              />
              <input
                type="color" value={cardColor} onChange={(e) => setCardColor(e.target.value)}
                className="p-[0.25rem] cursor-pointer rounded-md w-20 h-10 shadow-sm hover:scale-105"
                title="Pick a text color"
              />
            </div>
              <div className="flex flex-row w-[100%] items-center justify-between mt-2">
                <button
                onClick={() => setNewCard(false)}
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
          )
        }

      </section>
      <ListArea board={board} />
    </>
  )
}