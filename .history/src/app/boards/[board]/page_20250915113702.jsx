'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import ListDialogBox from '@/components/listDialogBox';
import ListArea from '@/components/listArea';
import CardDialogBox from '@/components/cardDialogBox';

export default function Boards() {
  const params = useParams();
  const boardId = params.board;
  const boardList = JSON.parse(localStorage.getItem('boards'));
  const board = boardList.find(b => b.id === boardId);
  const [listBox, setListBox] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const list = board.lists;
  const card 

  return (
    <>
      <section className="w-[100%] flex flex-row justify-between items-center bg-[#b32509] py-[0.6rem] px-4 shadow-md select-none">
        <h1 className="text-white text-[2rem] font-bold">Trello</h1>
        <div className="flex flex-row gap-4">
          <button onClick={() => setListBox(!listBox)} className="py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ List</button>
        </div>
        <ListDialogBox listBox={listBox} setListBox={setListBox} boardList={boardList} boardId={boardId} />
        <CardDialogBox newCard={newCard} setNewCard={setNewCard} boardList={boardList} />

      </section>
      <ListArea board={board} list={list} newCard={newCard} setNewCard={setNewCard} />
    </>
  )
}