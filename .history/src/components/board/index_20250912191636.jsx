
export default function Board({ boardList }){
    return(
        <>
        <div className="mt-4 w-[100%] h-auto grid grid-rows-3 gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap px-[2rem]">
            <h1 className="w-[10rem] rows-span-1 h-[5rem] border-2 border-red-900 rounded-md shadow-sm">hello</h1>
            <h1 className="w-[10rem] rows-span-1 h-[5rem] border-2 border-red-900 rounded-md shadow-sm">hello</h1>
            <h1 className="w-[10rem] rows-span-1 h-[5rem] border-2 border-red-900 rounded-md shadow-sm">hello</h1>

            <h1 className="w-[10rem] rows-span-1 h-[5rem] border-2 border-red-900 rounded-md shadow-sm">hello</h1>
            <h1 className="w-[10rem] h-[5rem] border-2 border-red-900 rounded-md shadow-sm">hello</h1>
            <h1 className="w-[10rem] h-[5rem] border-2 border-red-900 rounded-md shadow-sm">hello</h1>

            <h1 className="w-[10rem] h-[5rem] border-2 border-red-900 rounded-md shadow-sm">hello</h1>
            <h1 className="w-[10rem] h-[5rem] border-2 border-red-900 rounded-md shadow-sm">hello</h1>
            <h1 className="w-[10rem] h-[5rem] border-2 border-red-900 rounded-md shadow-sm">hello</h1>
        </div>
        { console.log(boardList) }
        </>
    )
}