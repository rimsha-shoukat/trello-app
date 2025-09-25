'use client';
import { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { TbCancel } from "react-icons/tb";

export default function cardArea({ cards, board, activeList, boardList, setBoardList }) {
  const [editMode, setEditMode] = useState(null);
  const [updatedText, setUpdatedText] = useState({});

  const Updates = (updatedCards) => {
    const updatedLists = board?.lists?.map(l => {
      if (l.id === activeList) {
        return { ...l, cards: updatedCards };
      }
      return l;
    });

    const updatedBoards = boardList.map(b => {
      if (b.id === board.id) {
        return { ...b, lists: updatedLists };
      }
      return b;
    });
    localStorage.setItem('boards', JSON.stringify(updatedBoards));
    setBoardList(updatedBoards);
  };

  const handleCheck = (Id) => {
    const updatedCards = cards.map(card => {
      if (card.id === Id) {
        return { ...card, check: !card.check };
      }
      return card;
    });
    Updates(updatedCards);
  };

  const deleteCard = (Id) => {
    const updatedCards = cards.filter(card => card.id !== Id);
    Updates(updatedCards);
  };

  const handleEditCard = (id, currentDescription) => {
    setEditMode(id);
    setUpdatedText(prev => ({ ...prev, [id]: currentDescription }));
  };

  const editCard = (Id) => {
    if (!updatedText[Id]?.trim()) return; // Prevent empty descriptions
    const updatedCards = cards.map(card => {
      if (card.id === Id) {
        return { ...card, description: updatedText[Id] };
      }
      return card;
    });
    Updates(updatedCards);
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

  if (!cards || !Array.isArray(cards)) return null;

  return (
    <>
      {cards.map((card) => {
        const cardBg = card.bg || '#ffffff'; // Fallback to white if no bg
        const cardText = card.text || '#333333'; // Fallback to dark text
        const isChecked = card.check || false;
        const isEditing = editMode === card.id;

        return (
          <div key={card.id} className="relative w-full group mb-3">
            {/* Action Icons Overlay */}
            <div className={`
              absolute top-2 right-2 flex flex-row gap-2 bg-black/20 backdrop-blur-sm rounded-full p-2 
              transition-all duration-300 opacity-0 group-hover:opacity-100 z-10
              ${isEditing ? 'opacity-100 bg-white/30' : ''}
            `}>
              {isEditing ? (
                <>
                  <TbCancel 
                    style={{ color: cardText }} 
                    onClick={cancelEdit}
                    className="hover:scale-110 text-lg cursor-pointer transition-all duration-200 hover:bg-white/20 rounded p-1" 
                  />
                  <VscSaveAs 
                    style={{ color: cardText }} 
                    onClick={() => editCard(card.id)}
                    className="hover:scale-110 text-lg cursor-pointer transition-all duration-200 hover:bg-white/20 rounded p-1" 
                  />
                </>
              ) : (
                <>
                  <CiEdit 
                    style={{ color: cardText }} 
                    onClick={() => handleEditCard(card.id, card.description)}
                    className="text-lg hover:scale-110 cursor-pointer transition-all duration-200 hover:bg-white/20 rounded p-1" 
                  />
                  <MdOutlineDelete 
                    style={{ color: cardText }} 
                    onClick={() => deleteCard(card.id)}
                    className="text-lg hover:scale-110 cursor-pointer transition-all duration-200 hover:bg-white/20 rounded p-1" 
                  />
                </>
              )}
            </div>

            {/* Card Body */}
            <section 
              data-swapy-item={card.id}
              draggable={true}
              style={{ backgroundColor: cardBg }}
              className={`
                w-full flex items-start justify-start gap-3 h-auto p-e border-2 border-white/20 rounded-xl shadow-md 
                group-hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative cursor-pointer
                ${isChecked ? 'opacity-60 line-through' : ''}
                ${isEditing ? 'shadow-lg ring-2 ring-indigo-500/30' : 'group-hover:brightness-105'}
              `}
            >
              {/* Checkbox */}
              <label className="relative flex items-center cursor-pointer mt-1">
                <input 
                  type="checkbox" 
                  checked={isChecked} 
                  onChange={() => handleCheck(card.id)}
                  className="sr-only peer" // Hidden, styled via peer
                />
                <div className={`
                  w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-200
                  bg-white peer-checked:bg-gradient-to-br from-indigo-500 to-purple-500 peer-checked:border-transparent
                  ${isChecked ? 'shadow-md' : 'border-gray-300 hover:border-indigo-500'}
                `}>
                  {isChecked && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </label>

              {/* Description Text/Input */}
              {isEditing ? (
                <input
                  autoFocus
                  type="text"
                  value={updatedText[card.id] || card.description || ''}
                  onChange={(e) => handleTextChange(card.id, e.target.value)}
                  style={{ color: cardText, background: 'transparent' }}
                  className="flex-1 text-base leading-relaxed font-medium px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-200 bg-white/10 backdrop-blur-sm resize-none"
                  placeholder="Edit card description..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      editCard(card.id);
                    }
                    if (e.key === 'Escape') {
                      cancelEdit();
                    }
                  }}
                />
              ) : (
                <p
                  style={{ color: cardText }}
                  className="flex-1 text-base leading-relaxed font-medium px-2 py-1 break-words"
                >
                  {card.description || 'Untitled Card'}
                </p>
              )}

              {/* Subtle gradient overlay on hover for depth */}
              {!isEditing && (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              )}
            </section>
          </div>
      )})}
    </>
  );
}
