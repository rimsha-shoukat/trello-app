
export default function listArea({ board}) {
    return (
        <>
            <section
                className="mt-6 w-[100%] h-auto">
                {board.lists && Array.isArray(board.lists) && board.lists.length === 0 ? (
                    <h2 className="text-[1.2rem] text-[#b32509]">No lists added yet!</h2>
                ) : (
                    <>
                        <h1 className="text-[2.2rem] px-[2rem] text-[#b32509] font-bold">{board.title}</h1>
                        <div
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                            className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-1 gap-8 items-start justify-start overflow-x-auto overflow-y-hidden px-[2rem]">
                            {board.lists && Array.isArray(board.lists) && board.lists.map(list => (
                                <div key={list.id} style={{ backgroundColor: list.bg }} className={`w-[24rem] h-auto p-4 border-none flex flex-col items-center justify-center overflow-hidden rounded-md shadow-md`}>
                                    <h1 style={{ color: list.text }} className="text-[1.2rem] leading-7 mb-2">{list.title}</h1>
                                    {list.card && Array.isArray(list.card) && list.card.length > 0 && <Card cards={list.card} />}
                                    <button onClick={setNewCard(!newCard)} className="w-[100%] hover:scale-105 rounded-md cursor-pointer font-semibold text-[#b32509] py-[0.3rem] bg-gray-400 hover:bg-gray-300/60 shadow-md transition-all duration-300">+ card</button>
                                </div>
                            ))
                            }
                        </div>
                    </>
                )
                }
            </section>
        </>
    )
}