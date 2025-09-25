'use client';
import { createSwapy } from 'swapy'
import dynamic from 'next/dynamic';
import { useState, useRef, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { TbCancel } from "react-icons/tb";
const CardArea = dynamic(() => import('@/components/cardArea'), { loading: () => <p>Loading...</p>, ssr: false });

export default function listArea({ board, setNewCard, setActiveList, boardList, setBoardList }) {
  const swapy = useRef(null)
  const container = useRef(null)
  const list = board?.lists || [];
  const [editMode, setEditMode] = useState(null);
  const [updatedText, setUpdatedText] = useState({});

    updatedLists.forEach((l, idx) => {
      if (l.cards) {
        const cardIdx = l.cards.findIndex(c => c.id == draggedItemId);
        if (cardIdx > -1) {
          originalListId = l.id;
          draggedCard = l.cards[cardIdx];
          updatedLists[idx].cards.splice(cardIdx, 1);
        }
      }
    });

  const Updates = (updatedList) => {
    const updatedBoards = boardList.map(b => {
      if (b.id === board.id) {
        return { ...b, lists: updatedList };
      }
      return b;
    });
    localStorage.setItem('boards', JSON.stringify(updatedBoards));
    setBoardList(updatedBoards);
  };

  const deleteList = (Id) => {
    const updatedList = list.filter(l => l.id !== Id);
    Updates(updatedList);
  };

  const handleEditList = (id, currentTitle) => {
    setEditMode(id);
    setUpdatedText(prev => ({ ...prev, [id]: currentTitle }));
  };

  const editList = (Id) => {
    if (!updatedText[Id]?.trim()) return; // Prevent empty titles
    const updatedList = list.map(l => {
      if (l.id === Id) {
        return { ...l, title: updatedText[Id] };
      }
      return l;
    });
    Updates(updatedList);
    setEditMode(null);
    setUpdatedText(prev => ({ ...prev, [Id]: '' })); // Clear temp state
  };

  const cancelEdit = () => {
    setEditMode(null);
    setUpdatedText(prev => {
      const newState = { ...prev };
      if (editMode) delete newState[editMode];
      return newState;
    });
  };

  const handleTextChange = (id, value) => {
    setUpdatedText(prev => ({ ...prev, [id]: value }));
  };

  const handleAddCard = (listId) => {
    setNewCard(true);
    setActiveList(listId);
  };

  if (!board) return <div className="flex items-center justify-center h-64 text-gray-500">Loading board...</div>;

  return (
    <section className="mt-8 w-full h-auto bg-gradient-to-br from-slate-50/50 to-indigo-50/50 py-4 rounded-2xl">
      {/* Board Title */}
      <h1 
        className="text-[2.5rem] px-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 font-bold text-center tracking-tight mb-6"
      >
        {board.title || 'Untitled Board'}
      </h1>

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 gap-4 p-8">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-4xl text-indigo-600">📝</span>
          </div>
          <h2 className="text-[1.5rem] font-bold text-gray-600 tracking-wide">No Lists Added Yet!</h2>
          <p className="text-gray-500 text-sm italic">Create your first list to get started organizing tasks.</p>
        </div>
      ) : (
        <>
          <div ref={container} 
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            className="mt-6 w-full h-auto grid grid-flow-col grid-rows-1 gap-6 items-start justify-start overflow-x-auto overflow-y-hidden px-8 custom-scrollbar"
          >
            {list.map(l => {
              const listBg = l.bg || '#f8fafc';
              const listText = l.text || '#334155';
              const isEditing = editMode === l.id;

              return (
                <div key={l.id} className="relative w-[20rem] h-auto group">
                  {/* Action Icons Overlay */}
                  <div className={`
                    absolute top-2 right-2 flex flex-row gap-2 bg-black/20 backdrop-blur-sm rounded-full p-2 
                    transition-all duration-300 opacity-0 group-hover:opacity-100 z-10
                    ${isEditing ? 'opacity-100 bg-white/30' : ''}
                  `}>
                    {isEditing ? (
                      <>
                        <TbCancel 
                          style={{ color: listText }} 
                          onClick={cancelEdit}
                          className="hover:scale-110 text-lg cursor-pointer transition-all duration-200 hover:bg-white/20 rounded p-1" 
                        />
                        <VscSaveAs 
                          style={{ color: listText }} 
                          onClick={() => editList(l.id)}
                          className="hover:scale-110 text-lg cursor-pointer transition-all duration-200 hover:bg-white/20 rounded p-1" 
                        />
                      </>
                    ) : (
                      <>
                        <CiEdit 
                          style={{ color: listText }} 
                          onClick={() => handleEditList(l.id, l.title)}
                          className="text-lg hover:scale-110 cursor-pointer transition-all duration-200 hover:bg-white/20 rounded p-1" 
                        />
                        <MdOutlineDelete 
                          style={{ color: listText }} 
                          onClick={() => deleteList(l.id)}
                          className="text-lg hover:scale-110 cursor-pointer transition-all duration-200 hover:bg-white/20 rounded p-1" 
                        />
                      </>
                    )}
                  </div>

                  {/* List Container */}
                  <div 
                    style={{ backgroundColor: listBg }}
                    className={`
                      w-full h-auto p-6 border-2 border-white/20 flex flex-col gap-4 items-start justify-start 
                      overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 
                      hover:scale-[1.02] relative min-h-[20rem]
                      ${isEditing ? 'shadow-xl ring-2 ring-indigo-500/30' : 'group-hover:brightness-105'}
                    `}
                  >
                    {/* List Title */}
                    {isEditing ? (
                      <input
                        autoFocus
                        type="text"
                        value={updatedText[l.id] || l.title || ''}
                        onChange={(e) => handleTextChange(l.id, e.target.value)}
                        style={{ color: listText, background: 'transparent' }}
                        className="text-[1.4rem] leading-tight font-bold w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-200 bg-white/10 backdrop-blur-sm"
                        placeholder="Edit list title..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            editList(l.id);
                          }
                          if (e.key === 'Escape') {
                            cancelEdit();
                          }
                        }}
                      />
                    ) : (
                      <h3
                        style={{ color: listText }}
                        className="text-[1.4rem] leading-tight font-bold px-3 py-2 tracking-wide cursor-default"
                      >
                        {l.title || 'Untitled List'}
                      </h3>
                    )}

                    {/* Cards Area */}
                    {l.cards && Array.isArray(l.cards) && l.cards.length > 0 ? (
                      <div 
                      data-swapy-slot={l.id} 
                      className="w-full flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
                        <CardArea
                          cards={l.cards} 
                          board={board} 
                          activeList={l.id} 
                          boardList={boardList} 
                          setBoardList={setBoardList} 
                        />
                      </div>
                    ) : (
                      <div
                      data-swapy-slot={l.id} 
                      className="flex-1 flex items-center justify-center py-8 text-gray-500">
                        <span className="text-sm italic">No cards yet. Add one below!</span>
                      </div>
                    )}

                    {/* Add Card Button */}
                    <button 
                      onClick={() => handleAddCard(l.id)}
                      className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500/80 via-purple-500/80 to-pink-500/80 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 rounded-xl cursor-pointer font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 backdrop-blur-sm border border-white/20 mt-auto"
                    >
                      + Add Card
                    </button>

                    {/* Subtle gradient overlay on hover */}
                    {!isEditing && (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
