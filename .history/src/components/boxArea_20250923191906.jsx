import dynamic from 'next/dynamic';
const BoxList = dynamic(() => import('./boxList'), { ssr: false });

export default function BoxArea({ boardList, setBoardList, greeting }) {

  return (
    <section className="select-none text-gray-800 w-[100%] h-[100vh] flex flex-col items-center justify-start bg-gradient-to-br from-slate-50 via-white to-indigo-50 pt-8 pb-12 overflow-hidden">
      <h1 className={`${greeting ? 'block' : 'hidden'} font-bold text-[3rem]`} >Welcome to Trello!</h1>
      {
        boardList && Array.isArray(boardList) && boardList.length === 0 ? (
          <p className="font-bold text-[1rem]">No Board created Yet!</p>
        ) : (
          <section style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
            className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-2 gap-8 items-start justify-start overflow-x-auto overflow-y-hidden px-[2rem] ">
            <BoxList boardList={boardList} setBoardList={setBoardList} />
          </section>
        )}
    </section>
  )
}