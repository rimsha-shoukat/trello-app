'use client';
import Link from 'next/link';

export default function boardHeader({ listBox, setListBox }) {

    return (
        <>
            <Link href="/">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-300 text-[2.2rem] font-bold cursor-pointer tracking-wide hover:scale-105 transition-transform duration-200">Trello</h1>
            </Link>
            <div className="flex flex-row gap-4">
                <button onClick={() => setListBox(!listBox)} className="py-3 px-6 hover:shadow-lg hover:scale-105 hover:shadow-indigo-500/50 shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg cursor-pointer font-semibold text-white border border-white/20 backdrop-blur-sm transition-all duration-200 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600">+ List</button>
            </div>
        </>
    )
}