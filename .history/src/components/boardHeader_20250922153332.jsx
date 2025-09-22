'use client';


export default function boardHeader() {

    return (
        <>
            <Link href="/">
                <h1 className="text-white text-[2rem] font-bold cursor-pointer">Trello</h1>
            </Link>
            <div className="flex flex-row gap-4">
                <button onClick={() => setListBox(!listBox)} className="py-2 px-4 hover:shadow-sm hover:scale-105 hover:shadow-gray-300 shadow-md bg-[#333231] rounded-md cursor-pointer font-semibold">+ List</button>
            </div>
        </>
    )
}