'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { TbCancel } from "react-icons/tb";

export default function boxList({ boardList, setBoard}){
     const [editMode, setEditMode] = useState(null);
      const [updatedText, setUpdatedText] = useState({});
    
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
        setEditMode(null);
      }
    
      const handleTextChange = (id, value) => {
        setUpdatedText(prev => ({ ...prev, [id]: value }));
      };

    return(
        <>
            {boardList.map(board => (
              <div key={board.id} className="relative w-[24rem] h-[12rem]">
                {
                  editMode ? (
                    <div className="absolute top-2 right-2 flex flex-row gap-2">
                      <TbCancel style={{ color: board.text }} onClick={() => setEditMode(null)} className="hover:scale-105 text-[1.5rem] cursor-pointer transition-opacity duration-300" />
                      <VscSaveAs style={{ color: board.text }} onClick={() => editBoard(board.id)} className="hover:scale-105 text-[1.5rem] cursor-pointer transition-opacity duration-300" />
                    </div>
                  ) : (
                    <div className="absolute top-2 right-2 flex flex-row gap-2">
                      <CiEdit style={{ color: board.text }} onClick={() => handleEditBoard(board.id, board.title)} className="text-[1.5rem] hover:scale-105 cursor-pointer transition-opacity duration-300" />
                      <MdOutlineDelete style={{ color: board.text }} onClick={() => deleteBoard(board.id)} className="text-[1.5rem] hover:scale-105 cursor-pointer transition-opacity duration-300" />
                    </div>
                  )
                }

                {editMode === board.id ? (
                  <div
                    style={{ backgroundColor: board.bg }}
                    className="w-[100%] h-[100%] border-none flex items-center justify-center overflow-hidden rounded-md shadow-md"
                  >
                    <input
                      readOnly={false}
                      onChange={(e) => handleTextChange(board.id, e.target.value)}
                      type="text"
                      value={updatedText[board.id] || board.title}
                      style={{ color: board.text }}
                      className="text-[2rem] text-center leading-7"
                    />
                  </div>
                ) : (
                  <Link href={`/boards/${board.id}`}>
                    <div
                      style={{ backgroundColor: board.bg }}
                      className="w-[100%] h-[100%] border-none flex items-center justify-center overflow-hidden rounded-md shadow-md"
                    >
                      <input
                        readOnly
                        type="text"
                        value={board.title}
                        style={{ color: board.text }}
                        className="text-[2rem] text-center leading-7"
                      />
                    </div>
                  </Link>
                )}

              </div>
            ))}
        </>
    )
}