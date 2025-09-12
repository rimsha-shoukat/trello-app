
export default function Board({ boardList }) {
    return (
            <div className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-3 gap-6 items-start justify-start overflow-x-auto overflow-y-hidden px-[2rem] ">
                {
                    boardList.map((list) => {
                        return (
                            <div key={list.id} style={{ backgroundColor: list.bg }} className={`w-[15rem] h-[8rem] p-4 border-none flex flex-col gap-2 items-center justify-center overflow-hidden rounded-md shadow-md`}>
                                <h1 style={{ color : list.text }} className="text-[2rem]">{list.title}</h1>
                            </div>
                        );
                })
                }
            </div>
    )
}