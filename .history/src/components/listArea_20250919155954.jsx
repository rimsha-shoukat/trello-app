'use client';
import { useState } from 'react';
import CardArea from './cardArea.jsx';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { TbCancel } from "react-icons/tb";

export default function listArea({ board, newCard, setNewCard, setActiveList, boardList, setBoardList }) {
    const list = board?.lists;
    const [editMode, setEditMode] = useState(false);
    const [updatedText, setUpdatedText] = useState('');

    const Updates = (updatedList) => {
        const updatedBoards = boardList.map(b => {
            if (b.id === board.id) {
                return { ...b, lists: updatedList };
            }
            return b;
        });
        localStorage.setItem('boards', JSON.stringify(updatedBoards));
        setBoardList(updatedBoards);
    }

    const deleteList = (Id) => {
        const updatedList = list.map(l => {
            if (l.id !== Id) {
                return l;
            }
        });
        Updates(updatedList.filter(l => l !== undefined));
    }

     const handleEditList = (id) => {
        setEditMode(true);
    }

    const editList = (Id) => {
        setEditMode(true);
        const updatedList = list.map(l => {
            if (l.id === Id) {
                return l.Title = updatedText;
            }
            return l;
        });
        Updates(updatedList);
    }

    return (
        <>
            <section
                className="mt-6 w-[100%] h-auto">
                    <h1 className="text-[2.2rem] px-[2rem] text-[#333231] font-bold">{board?.title}</h1>
                {list && Array.isArray(list) && list.length === 0 ? (
                    <h2 className="text-[1.2rem] text-[#333231] p-[2rem]">No lists added yet!</h2>
                ) : (
                    <>
                        <div
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                            className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-1 gap-[2rem] items-start justify-start overflow-x-auto overflow-y-hidden px-[2rem]">
                            {list && Array.isArray(list) && list.map(l => (
                            <div key={l.id} className="relative w-[20rem] h-auto">
                                {
                                    editMode ? (
                                        <div className="absolute top-2 right-2 flex flex-row gap-2">
                                <TbCancel style={{ color: l.text }} onClick={ () => setEditMode(false)} className="hover:scale-105 text-[1.5rem] cursor-pointer transition-opacity duration-300" />
                                <VscSaveAs  style={{ color: l.text }} onClick={ () => editList(l.id)} className="hover:scale-105 text-[1.5rem] cursor-pointer transition-opacity duration-300"/>
                                </div>
                                    ) : (
                                        <div className="absolute top-2 right-2 flex flex-row gap-2">
                                <CiEdit style={{ color: l.text }} onClick={() => handleEditList(l.id)} className="text-[1.5rem] hover:scale-105 cursor-pointer transition-opacity duration-300" />
                                <MdOutlineDelete style={{ color: l.text }} onClick={() => deleteList(l.id)} className="text-[1.5rem] hover:scale-105 cursor-pointer transition-opacity duration-300"/>
                                </div>
                                    )
                                }
                                
                                <div key={l.id} style={{ backgroundColor: l.bg }} className={`w-[100%] h-auto p-4 border-none flex flex-col gap-4 items-center justify-center overflow-hidden rounded-md shadow-md`}>
                                    <input readOnly={!editMode} onChange={ (e) => setUpdatedText(e.target.value) } style={{ color: l.text }} type="text" value={l.title} className="text-[1.2rem] leading-7"/>
                                        {l.cards && Array.isArray(l.cards) && l.cards.length > 0 && <CardArea cards={l.cards} board={board} activeList={l.id} boardList={boardList} setBoardList={setBoardList} /> }
                                    <button onClick={() => {setNewCard(!newCard); setActiveList(l.id);} } className="w-[100%] hover:scale-105 rounded-md cursor-pointer font-semibold text-[#333231] py-[0.3rem] bg-gray-400 hover:bg-gray-300/60 shadow-md transition-all duration-300">+ card</button>
                                </div>
                            </div>
                            ))
                            }
                        </div>
                    </>
                )
                }
            </section>
        </>
    )
}