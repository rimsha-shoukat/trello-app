'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BoardHeader from '@/components/boardHeader';
const ListDialogBox = dynamic(() => import('@/components/listDialogBox'), { loading: () => <p>Loading...</p>, ssr: false });
const CardDialogBox = dynamic(() => import('@/components/cardDialogBox'), { loading: () => <p>Loading...</p>, ssr: false });
const ListArea = dynamic(() => import('@/components/listArea'), { loading: () => <p>Loading...</p>, ssr: false });

export default function Boards() {
  const [boardList, setBoardList] = useState([]);

useEffect(() => {
  const storedBoards = localStorage.getItem('boards') || '[]';
  setBoardList(JSON.parse(storedBoards));
}, []);

  const params = useParams();
  const boardId = params.board;
  const board = boardList.find(b => b.id === boardId);
  const [listBox, setListBox] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [activeList, setActiveList] = useState('');

  return (
    <>
      <section className="w-[100%] flex flex-row justify-between items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-4 px-6 shadow-lg select-none backdrop-blur-sm border-b-2 border-white/20">
        <BoardHeader listBox={listBox} setListBox={setListBox} />
      </section>
      <ListDialogBox listBox={listBox} setListBox={setListBox} boardId={boardId} boardList={boardList} setBoardList={setBoardList} />
      {board && <CardDialogBox newCard={newCard} setNewCard={setNewCard} board={board} activeList={activeList} boardList={boardList} setBoardList={setBoardList} />}
      <ListArea board={board} newCard={newCard} setNewCard={setNewCard} setActiveList={setActiveList} boardList={boardList} setBoardList={setBoardList} />
    </>
  )
}