'use client';
import { useState } from 'react';

export default function BoardsLayout({ children }){
    const[dropdown, setDropdown] = useState(false);

    return (
        <>
        <navbar className="w-[100%] flex flex-row justify-between items-center bg-[#b32509] py-[0.6rem] px-4 shadow-md select-none">
         <h1 className="text-white text-[2rem] font-bold">Trello</h1>
         <div className="flex flex-row gap-4">
            <button onClick= {() => setDropdown(!dropdown)} className="text-white py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">Boards</button>
            <button className="text-white py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ List</button>
         </div>
         
        </navbar>
        
        { children }
        </>
    )
}