
export default function Board({ boardList }){
    return(
        <>
        <div className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-3 gap-6 items-start justify-start overflow-x-auto overflow-y-hidden whitespace-nowrap px-[2rem]">
            {
                boardList.map()
            }
            <div className="w-[15rem] h-[8rem] p-4 border-2 flex flex-col gap-2 items-center justify-center border-red-900 rounded-md shadow-sm">
                <h1 className="text-[2rem]">{list.title}</h1>
                {
                    list.description && <p className="text-sm overflow-hidden">{list.description}</p>
                }
                
            </div>
        </div>
        </>
    )
}