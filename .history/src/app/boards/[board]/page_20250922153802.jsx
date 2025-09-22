'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ListArea from '@/components/listArea';
import CardDialogBox from '@/components/cardDialogBox';
import BoardHeader from '@/components/boardHeader';



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
      <section className="w-[100%] flex flex-row justify-between items-center bg-[#333231] py-[0.6rem] px-4 shadow-md select-none">
        <BoardHeader listBox={listBox} setListBox={setListBox} />
        <ListDialogBox listBox={listBox} setListBox={setListBox} boardId={boardId} boardList={boardList} setBoardList={setBoardList} />
        {board && <CardDialogBox newCard={newCard} setNewCard={setNewCard} board={board} activeList={activeList} boardList={boardList} setBoardList={setBoardList} />}
      </section>
      <ListArea board={board} newCard={newCard} setNewCard={setNewCard} setActiveList={setActiveList} boardList={boardList} setBoardList={setBoardList} />
    </>
  )
}