'use client';

export default function mainHeader({boardBox, setBoardBox}){
    return(
        <>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-300 text-[2.2rem] font-bold">Trello</h1>
                <div className="flex flex-row gap-4">
                <button
                    onClick={() => setBoardBox(!boardBox)}
                    className="py-3 px-6 hover:shadow-lg hover:scale-105 hover:shadow-indigo-500/50 shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg cursor-pointer font-semibold text-white border border-white/20 backdrop-blur-sm transition-all duration-200 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
                >
                    + Board
                </button>
            </div>
        </>
    )
}