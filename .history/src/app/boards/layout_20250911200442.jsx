'use client';
import { useState } from 'react';

export default function BoardsLayout({ children }){
    const[dropdown, setDropdown] = useState(false);

    return (
        <>
        <navbar className="w-[100%] flex flex-row justify-between items-center bg-[#b32509] py-[0.6rem] px-4 shadow-md select-none">
         <h1 className="text-white text-[2rem] font-bold">Trello</h1>
         <div className="flex flex-row gap-4">
            <button onClick= {() => setDropdown(!dropdown)} className="py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">Boards</button>
            <button className="py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ List</button>
         </div>
         {   
            dropdown && <div className="absolute w-[10rem] top-[4.5rem] right-[6rem] transition-all ease-in-out duration-6 delay-[0.3s] bg-[#b32509] p-2 rounded-md">
            <h1 className="p-2 text-[1rem] cursor-pointer hover:bg-gray-400/40 rounded-md">option appdu</h1>
            <h1 className="p-2 text-[1rem] cursor-pointer hover:bg-gray-400/40 rounded-md">option sis ixn</h1>
            <button className="p-2 bg-gray-400/60 mt- w-[100%] hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ Board</button>
            </div>
        }
        </navbar>
        
        { children }
        </>
    )
}