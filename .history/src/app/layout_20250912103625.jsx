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
            <button onClick={()=> setListBox(!listBox)} className="py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ List</button>
         </div>
         {   
            boardBox && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#b32509] p-2 rounded-md">
            <input type="text" className="p-2 rounded-md w-[12rem]" placeholder="Enter board title" />

            <button className="px-4 py-2 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ Board</button>
            
            </div>
        }
        </navbar>
        {children}
      </body>
    </html>
  );
}