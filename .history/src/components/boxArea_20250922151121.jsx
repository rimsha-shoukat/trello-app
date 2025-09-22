import { BoxList } from './boxList';  
con
export default function BoxArea({ boardList, setBoardList, greeting }) {

  return (
    <section className="select-none text-[#333231] w-[100%] h-[100%] flex flex-col items-center justify-center mt-6">
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