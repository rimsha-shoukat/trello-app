'use client';

export default function mainHeader({boardBo}){
    return(
        <>
            <h1 className="text-white text-[2rem] font-bold">Trello</h1>
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