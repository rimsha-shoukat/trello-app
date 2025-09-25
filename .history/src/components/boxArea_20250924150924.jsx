import dynamic from 'next/dynamic';
const BoxList = dynamic(() => import('./boxList'), { ssr: false });

export default function BoxArea({ boardList, setBoardList, greeting }) {
  return (
    <section className="select-none text-gray-800 w-[100%] h- flex flex-col items-center justify-start bg-gradient-to-br from-slate-50 via-white to-indigo-50 pt-8 pb-12 overflow-hidden">
      <h1 
        className={`
          ${greeting ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-4'} 
          font-bold text-[3.5rem] text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 
          mx-auto text-center tracking-tight transition-all duration-700 ease-out
        `}
      >
        Welcome to Trello!
      </h1>
      {boardList && Array.isArray(boardList) && boardList.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 gap-4">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-4xl text-indigo-600">📋</span>
          </div>
          <p className="font-bold text-[1.25rem] text-gray-600 tracking-wide">No Boards Created Yet!</p>
          <p className="text-gray-500 text-sm italic">Get started by creating your first board above.</p>
        </div>
      ) : (
        <section 
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="mt-8 w-[100%] h-auto grid grid-flow-col grid-rows-2 gap-8 items-start justify-start overflow-x-auto overflow-y-hidden px-[2.5rem] pb-4 custom-scrollbar"
        >
          <BoxList boardList={boardList} setBoardList={setBoardList} />
        </section>
      )}
    </section>
  )
}
