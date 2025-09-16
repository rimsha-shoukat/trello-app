'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ListDialogBox from '@/components/listDialogBox';
import ListArea from '@/components/listArea';
import CardDialogBox from '@/components/cardDialogBox';

export default function Boards() {
  const [boardList, setBoardList] = useState([]);

useEffect(() => {
  const storedBoards = localStorage.getItem('boards') || '[]';
  setBoardList(JSON.parse(storedBoards));
}, []);
    
useEffect(() => {
  console.log('boardList:', boardList);
}, [boardList]);

  const params = useParams();
  const boardId = params.board;
  const board = boardList.find(b => b.id === boardId);
  const [listBox, setListBox] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [activeList, setActiveList] = useState('');

  return (
    <>
      <section className="w-[100%] flex flex-row justify-between items-center bg-[#b32509] py-[0.6rem] px-4 shadow-md select-none">
        <h1 className="text-white text-[2rem] font-bold">Trello</h1>
        <div className="flex flex-row gap-4">
          <button onClick={() => setListBox(!listBox)} className="py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ List</button>
        </div>
        <ListDialogBox listBox={listBox} setListBox={setListBox} boardId={boardId} boardList={boardList} />
        {board && <CardDialogBox newCard={newCard} setNewCard={setNewCard} board={board} activeList={activeList} boardList={boardList} setB />}
      </section>
      <ListArea board={board} newCard={newCard} setNewCard={setNewCard} setActiveList={setActiveList} />
    </>
  )
}