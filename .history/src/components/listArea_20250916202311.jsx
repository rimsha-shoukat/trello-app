'use client';
import CardArea from './cardArea.jsx';

export default function listArea({ board, newCard, setNewCard, setActiveList }) {
    const list = board?.lists;

    return (
        <>
            <section
                className="mt-6 w-[100%] h-auto">
                    
                {list && Array.isArray(list) && list.length === 0 ? (
                    <h2 className="text-[1.2rem] text-[#b32509]">No lists added yet!</h2>
                ) : (
                    <>
                        <div
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                            className="mt-4 w-[100%] h-auto grid grid-flow-col grid-rows-1 gap-8 items-start justify-start overflow-x-auto overflow-y-hidden px-[2rem]">
                            {list && Array.isArray(list) && list.map(l => (
                                <div key={l.id} style={{ backgroundColor: l.bg }} className={`w-[24rem] h-auto p-4 border-none flex flex-col gap-4 items-center justify-center overflow-hidden rounded-md shadow-md`}>
                                    <h1 style={{ color: l.text }} className="text-[1.2rem] leading-7">{l.title}</h1>
                                        {l.cards && Array.isArray(l.cards) && l.cards.length > 0 && <CardArea cards={l.cards} />}
                                    <button onClick={() => {setNewCard(!newCard); setActiveList(l.id);} } className="w-[100%] hover:scale-105 rounded-md cursor-pointer font-semibold text-[#b32509] py-[0.3rem] bg-gray-400 hover:bg-gray-300/60 shadow-md transition-all duration-300">+ card</button>
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