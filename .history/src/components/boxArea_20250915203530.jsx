import {useState, useEffect}
import Link from 'next/link';

export default function BoxArea() {

     useEffect(() => {
        const storedBoards = localStorage.getItem('boards');
        if (storedBoards) {
            setBoardList(JSON.parse(storedBoards));
        }
    }, []);

    return (
        <section className="select-none text-[#b32509] w-[100%] h-[100%] flex flex-col items-center justify-center mt-6">
        <h1 className="font-bold text-[3rem]">Welcome to Trello!</h1>
        {
        boardList && Array.isArray(boardList) && boardList.length === 0 ? (
          <p className="font-bold text-[1rem]">No Board created Yet!</p>
        ) : (
          <section style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
            className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-2 gap-8 items-start justify-start overflow-x-auto overflow-y-hidden px-[2rem] ">
            {boardList.map(board => (
              <Link key={board.id} href={`/boards/${board.id}`}>
                <div style={{ backgroundColor: board.bg }} className={`w-[20rem] h-[12rem] p-4 border-none flex items-center justify-center overflow-hidden rounded-md shadow-md`}>
                    <h1 style={{ color: board.text }} className="text-[2rem] leading-7">{board.title}</h1>
                </div>
              </Link>
            ))}
          </section>
        )}
      </section>
    )
}