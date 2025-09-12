
export default function Board({ boardList }){
    return(
        <>
        <div className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-3 gap-6 items-start justify-start overflow-x-auto overflow-y-hidden whitespace-nowrap px-[2rem]">
            <div className="w-[15rem] h-[8rem] p-2 border-2 text-center border-red-900 rounded-md shadow-sm">hell</div>
        </div>
        { console.log(boardList) }
        </>
    )
}