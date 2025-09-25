'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { TbCancel } from "react-icons/tb";

export default function boxList({ boardList, setBoardList }) {
  const [editMode, setEditMode] = useState(null);
  const [updatedText, setUpdatedText] = useState({});

  const Updates = (updatedBoards) => {
    localStorage.setItem('boards', JSON.stringify(updatedBoards));
    setBoardList(updatedBoards);
  };

  const deleteBoard = (Id) => {
    const updatedBoards = boardList.filter(b => b.id !== Id);
    Updates(updatedBoards);
  };

  const handleEditBoard = (id, currentTitle) => {
    setEditMode(id);
    setUpdatedText(prev => ({ ...prev, [id]: currentTitle }));
  };

  const editBoard = (Id) => {
    if (!updatedText[Id]?.trim()) return;
    const updatedBoards = boardList.map(b => {
      if (b.id === Id) {
        return { ...b, title: updatedText[Id] };
      }
      return b;
    });
    Updates(updatedBoards);
    setEditMode(null);
    setUpdatedText(prev => ({ ...prev, [Id]: '' })); 
  };

  const handleTextChange = (id, value) => {
    setUpdatedText(prev => ({ ...prev, [id]: value }));
  };

  const cancelEdit = () => {
    setEditMode(null);
    setUpdatedText(prev => {
      const newState = { ...prev };
      delete newState[editMode]; 
      return newState;
    });
  };

  if (!boardList || !Array.isArray(boardList)) return null;

  return (
    <>
      {boardList.map(board => (
        <div key={board.id} className="relative w-[24rem] h-[12rem] mx-2 group">
          {/* Action Icons Overlay */}
          <div className={`
            absolute top-4 right-4 flex flex-row gap-2 bg-black/20 backdrop-blur-sm rounded-full p-2 
            transition-all duration-300 opacity-0 group-hover:opacity-100 z-10
            ${editMode === board.id ? 'opacity-100 bg-white/30' : ''}
          `}>
            {editMode === board.id ? (
              <>
                <TbCancel 
                  style={{ color: board.text }} 
                  onClick={cancelEdit}
                  className="hover:scale-110 text-xl cursor-pointer transition-all duration-200 hover:bg-white/20 rounded p-1" 
                />
                <VscSaveAs 
                  style={{ color: board.text }} 
                  onClick={() => editBoard(board.id)}
                  className="hover:scale-110 text-xl cursor-pointer transition-all duration-200 hover:bg-white/20 rounded p-1" 
                />
              </>
            ) : (
              <>
                <CiEdit 
                  style={{ color: board.text || '#fff' }} 
                  onClick={() => handleEditBoard(board.id, board.title)}
                  className="text-xl hover:scale-110 cursor-pointer transition-all duration-200 hover:bg-white/20 rounded p-1" 
                />
                <MdOutlineDelete 
                  style={{ color: board.text || '#fff' }} 
                  onClick={() => deleteBoard(board.id)}
                  className="text-xl hover:scale-110 cursor-pointer transition-all duration-200 hover:bg-white/20 rounded p-1" 
                />
              </>
            )}
          </div>

          {/* Card Content */}
          {editMode === board.id ? (
            <div
              style={{ backgroundColor: board.bg }}
              className="w-full h-full border-2 border-white/20 flex items-center justify-center overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-default relative"
            >
              <input
                autoFocus
                onChange={(e) => handleTextChange(board.id, e.target.value)}
                type="text"
                value={updatedText[board.id] || board.title}
                style={{ color: board.text, background: 'transparent' }}
                className="text-[2.2rem] text-center leading-tight font-bold w-[90%] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200 bg-white/10 backdrop-blur-sm"
                placeholder="Edit board title..."
              />
              {/* Overlay for visual feedback during edit */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl" />
            </div>
          ) : (
            <Link href={`/boards/${board.id}`} className="block w-full h-full">
              <div
                style={{ backgroundColor: board.bg }}
                className="w-full h-full border-2 border-white/20 flex items-center justify-center overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 hover:scale-105 relative group-hover:brightness-105"
              >
                <h3
                  style={{ color: board.text }}
                  className="text-[2.2rem] text-center leading-tight font-bold px-4 tracking-wide"
                >
                  {board.title}
                </h3>
                {/* Subtle gradient overlay on hover for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>
            </Link>
          )}
        </div>
      ))}
    </>
  );
}
