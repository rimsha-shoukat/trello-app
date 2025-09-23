'use client';
import Link from 'next/link';

export default function boardHeader({ listBox, setListBox }) {

    return (
        <>
            <Link href="/">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-300 text-[2.2rem] font-bold cursor-pointer tracking-wide hover:scale-105 transition-transform duration-200">Trello</h1>
            </Link>
            <div className="flex flex-row gap-4">
                <button onClick={() => setListBox(!listBox)} className="py-2 px-4 hover:shadow-sm hover:scale-105 hover:shadow-gray-300 shadow-md bg-[#333231] rounded-md cursor-pointer font-semibold">+ List</button>
            </div>
        </>
    )
}