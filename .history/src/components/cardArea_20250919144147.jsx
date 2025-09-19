'use client';
import { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { TbCancel } from "react-icons/tb";

export default function cardArea ({ cards, board, activeList, boardList, setBoardList }) {

    const [editMode, setEditMode] = useState(false);

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
    }

    const handleCheck = (Id) => {
        const updatedCards = cards.map(card => {
            if (card.id === Id) {
                return { ...card, check: !card.check };
            }
            return card;
        });
        Updates(updatedCards);
    }

    const deleteCard = (Id) => {
        const updatedCards = cards.map(card => {
            if (card.id !== Id) {
                return card;
            }
        });
        Updates(updatedCards.filter(card => card !== undefined));
    }

    const editCard = (Id) => {
        setEditMode(true);
    }

    return (
        <>
            {cards && Array.isArray(cards) && cards.map((card) => (
               <div key={card.id} className="relative w-[100%]">
                {
                    editMode ? (
                        <div className="absolute top-2 right-2 flex flex-row gap-2">
                 <TbCancel style={{ color: card.text }} className="hover:scale-105 text-[1.5rem] cursor-pointer transition-opacity duration-300" />
                 <VscSaveAs style={{ color: card.text }} className="hover:scale-105 text-[1.5rem] cursor-pointer transition-opacity duration-300"/>
                 </div>
                    ) : (
                        <div className="absolute top-2 right-2 flex flex-row gap-2">
                 <CiEdit style={{ color: card.text }} onClick={() => editCard(card.id)} className="hover:scale-105 text-[1.5rem] cursor-pointer transition-opacity duration-300"/>
                 <MdOutlineDelete style={{ color: card.text }} onClick={ () => deleteCard(card.id)} className="hover:scale-105 text-[1.5rem] cursor-pointer transition-opacity duration-300"/>
                 </div>
                    )
                }
                    <section key={card.id} style={{backgroundColor: card.bg}} className="w-[100%] flex flex-row items-s justify-start gap-2 h-auto p-2 border-0 rounded-md shadow-md">
                        <input checked={card.check} onChange={() => handleCheck(card.id)} type="checkbox" className="cursor-pointer" />
                        <textArea readOnly={!editMode} type="text" rows='1' value={card.description} style={{color: card.text}} className="text-[1rem] text-justify leading-6"/>
                    </section>
                </div>
                ))
            }
        </>
    )
}