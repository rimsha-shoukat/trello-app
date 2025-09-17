'use client';
import Link from 'next/link';
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
}, [boardList]);

  const params = useParams();
  const boardId = params.board;
  const board = boardList.find(b => b.id === boardId);
  const [listBox, setListBox] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [activeList, setActiveList] = useState('');

  return (
    <>
      <section className="w-[100%] flex flex-row justify-between items-center bg-[#333231] py-[0.6rem] px-4 shadow-md select-none">
        <Link href="/">
        <h1 className="text-white text-[2rem] font-bold cursor-pointer">Trello</h1>
        </Link>
        <div className="flex flex-row gap-4">
          <button onClick={() => setListBox(!listBox)} className="py-2 px-4 hover:shadow-sm hover:scale-105 hover:shadow-gray-300 shadow-md bg-[#333231] rounded-md cursor-pointer font-semibold">+ List</button>
        </div>
        <ListDialogBox listBox={listBox} setListBox={setListBox} boardId={boardId} boardList={boardList} setBoardList={setBoardList} />
        {board && <CardDialogBox newCard={newCard} setNewCard={setNewCard} board={board} activeList={activeList} boardList={boardList} setBoardList={setBoardList} />}
      </section>
      <ListArea board={board} newCard={newCard} setNewCard={setNewCard} setActiveList={setActiveList} boardList={boardList} setBoardList={setBoardList} />
    </>
  )
}