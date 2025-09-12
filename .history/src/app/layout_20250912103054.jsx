'use client';
import { useState } from 'react';
import "./globals.css";

export const metadata = {
  title: "Trello App",
  description: "User workspace to manage different task",
};

export default function RootLayout({ children }) {
      const[boardBox, setBoardBox] = useState(false);
      const[listBox, setListBox] = useState(false);

  return (
    <html lang="en">
      <body>
        <navbar className="w-[100%] flex flex-row justify-between items-center bg-[#b32509] py-[0.6rem] px-4 shadow-md select-none">
         <h1 className="text-white text-[2rem] font-bold">Trello</h1>
         <div className="flex flex-row gap-4">
            <button onClick= {() => setBoardBox(!boardBox)} className="py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ Board</button>
            <button onClick={()=> setList} className="py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ List</button>
         </div>
         {   
            boardBox && <div className="absolute top-[4.5rem] w-[12rem] right-[0.5rem] bg-[#b32509] p-2 rounded-md">
            <h1 className="p-2 text-[1rem] cursor-pointer hover:bg-gray-400/40 rounded-md">option ftg appdu</h1>
            <h1 className="p-2 text-[1rem] cursor-pointer hover:bg-gray-400/40 rounded-md">option sis ixn</h1>
            <button className="p-2 bg-gray-400/60 mt-2 w-[100%] hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ Board</button>
            </div>
        }
        </navbar>
        {children}
      </body>
    </html>
  );
}