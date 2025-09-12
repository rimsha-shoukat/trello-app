
export default function Board({ boardList }) {
    return (
            <div className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-3 gap-6 items-start justify-start overflow-x-auto overflow-y-hidden whitespace-nowrap px-[2rem]">
                {
                    boardList.map((list) => {
                        return (
                            <div key={list.id} style={} className={`w-[15rem] h-[8rem] p-4 border-none flex flex-col gap-2 items-center justify-center rounded-md shadow-md`}>
                                <h1 className="text-[2rem] text-gray-700">{list.title}</h1>
                                {
                                    list.description && <p className="text-sm overflow-hidden text-gray-500">{list.description}</p>
                                }
                            </div>
                        );
                })
                }
            </div>
    )
}