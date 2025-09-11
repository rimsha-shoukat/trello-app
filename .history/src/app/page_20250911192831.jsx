'use client';
import Board from "@/components/board";

const createBoard = () => {
  console.log("Create Board");
}

export default function Home() {
  const boardList = [];

  return (
    <>
      <navbar className="w-[100%] flex flex-row justify-between items-center bg-[#b32509] p-[0.6rem] shadow-md select-none">
        <h1 className="text-[2rem] font-bold">Trello</h1>
        <button onClick={() => createBoard} className="py-2 px-4 bg-gray-400/60 hover:bg-gray-400/40 rounded-md cursor-pointer font-semibold">+ Board</button>
      </navbar>
      <div className="select-none text-[#b32509] w-[100%] h-[100%] flex flex-col items-center justify-center mt-6">
        <h1 className="font-bold text-[3rem]">Welcome to Trello!</h1>
        {boardList.length === 0 ?
          <p className="font-bold text-[1rem]">No Board created Yet!</p>
          : <Board />
        }
      </div>

    </>
  );
}