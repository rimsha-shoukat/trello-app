import BoardsBox from "./boardsBox";

export default function BoardsLayout({ children }){
    let showBox = true;
    return (
        <>
        <navbar className="w-[100%] flex flex-row justify-between items-center bg-[#b32509] p-[0.6rem] shadow-md select-none">
         <h1 className="text-white text-[2rem] font-bold">Trello</h1>
         <div className="flex flex-row gap-4">
            <button onClick= {() => (!showBox)} className="text-white py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">Boards</button>
            <button className="text-white py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ List</button>
         </div>
        </navbar>
        <BoardsBox showBox={showBox}/>
        { children }
        </>
    )
}