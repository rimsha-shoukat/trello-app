'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { TbCancel } from "react-icons/tb";

export default function BoxArea({ boardList, setBoardList }) {

  const[greeting, setGreeting] = useState(true);
  const [editMode, setEditMode] = useState(null);
    const [updatedText, setUpdatedText] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setGreeting(false);
    }, 9000);
    return () => {
      clearTimeout(timer);
    }
  },[]);

  useEffect(() => {
    const storedBoards = localStorage.getItem('boards') || '[]';
    setBoardList(JSON.parse(storedBoards));
  }, []);

   const Updates = (updatedBoards) => {
        localStorage.setItem('boards', JSON.stringify(updatedBoards));
        setBoardList(updatedBoards);
    }

   const deleteBoard = (Id) => {
        const updatedBoards = boardList.map(b => {
            if (b.id !== Id) {
                return b;
            }
        });
        Updates(updatedBoards.filter(b => b !== undefined));
    }

    const handleEditBoard = (id, currentTitle) => {
        setEditMode(id);
    setUpdatedText(prev => ({ ...prev, [id]: currentTitle }));
    }

    const editBoard = (Id) => {
        setEditMode(true);
        const updatedBoards = boardList.map(b => {
            if (b.id === Id) {
                return { ...b, title: updatedText[Id] || b.title };
            }
            return b;
        });
        Updates(updatedBoards);
    }

  return (
    <section className="select-none text-[#333231] w-[100%] h-[100%] flex flex-col items-center justify-center mt-6">
      <h1 className={`${greeting ? 'block' : 'hidden'} font-bold text-[3rem]`} >Welcome to Trello!</h1>
      {
        boardList && Array.isArray(boardList) && boardList.length === 0 ? (
          <p className="font-bold text-[1rem]">No Board created Yet!</p>
        ) : (
          <section style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
            className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-2 gap-8 items-start justify-start overflow-x-auto overflow-y-hidden px-[2rem] ">
            {boardList.map(board => (
            <div key={board.id} className="relative w-[24rem] h-[12rem]">
              {
                editMode ? (
                  <div className="absolute top-2 right-2 flex flex-row gap-2">
                    <TbCancel style={{ color: board.text }} onClick={ () => setEditMode(false)} className="hover:scale-105 text-[1.5rem] cursor-pointer transition-opacity duration-300" />
                    <VscSaveAs  style={{ color: board.text }} onClick={ () => editBoard(board.id)} className="hover:scale-105 text-[1.5rem] cursor-pointer transition-opacity duration-300"/>
                 </div>
                ) : (
                  <div className="absolute top-2 right-2 flex flex-row gap-2">
                    <CiEdit style={{ color: board.text }} onClick={()=> handleEditBoard(board.id)} className="text-[1.5rem] hover:scale-105 cursor-pointer transition-opacity duration-300"/>
                    <MdOutlineDelete style={{ color: board.text }} onClick={() => deleteBoard(board.id)} className="text-[1.5rem] hover:scale-105 cursor-pointer transition-opacity duration-300"/>
                  </div>
                )
              }
              
              <Link key={board.id} href={`/boards/${board.id}`}>
                <div style={{ backgroundColor: board.bg }} className={`w-[100%] h-[100%] border-none flex items-center justify-center overflow-hidden rounded-md shadow-md`}>
                  <input readOnly={!editMode} onChange={ (e) => setUpdatedText(e.target.value) } type="text" value={board.title} style={{ color: board.text }} className="text-[2rem] text-center leading-7" />
                </div>
              </Link>
            </div>
            ))}
          </section>
        )}
    </section>
  )
}