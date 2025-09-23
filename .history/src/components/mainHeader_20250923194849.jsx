'use client';

export default function mainHeader({boardBox, setBoardBox}){
    return(
        <>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-300 text-[2.2rem] font-bold cursor-pointer tracking-wide">Trello</h1>
                <div className="flex flex-row gap-4">
                <button
                    onClick={() => setBoardBox(!boardBox)}
                    className="py-2 px-4 bg-[#333231] hover:shadow-sm hover:scale-105 hover:shadow-gray-300 rounded-md cursor-pointer font-semibold text-white shadow-md transition-all duration-300"
                >
                    + Board
                </button>
            </div>
        </>
    )
}