'use client';

export default function cardArea ({ cards, board, activeList, boardList, setBoardList }) {

    const handleCheck = (Id) => {
        const updatedCards = cards.map(card => {
            if (card.id === Id) {
                return { ...card, check: !card.check };
            }
            return card;
        });

         const updatedLists = board?.lists?.map(l => {
            if (l.id === activeList) {
                return { ...l, cards: updatedCards };
            }
            return l;
        });

        const updatedBoards = boardList.map(b => {
            if (b.id === board.id) {
                return { ...b, lists: updatedLists };
            }
            return b;
        });
        localStorage.setItem('boards', JSON.stringify(updatedBoards));
        setBoardList(updatedBoards);
    }

    return (
        <>
            {cards && Array.isArray(cards) && cards.map((card) => (
               <div key={board.id} className="relative w-[20rem] h-[12rem]">
                 <CiEdit style={{ color: .text }} className="absolute text-[1.2rem] cursor-pointer top-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-300"/>
                    <section key={card.id} style={{backgroundColor: card.bg}} className="w-[100%] flex flex-row items-s justify-start gap-2 h-auto p-2 border-0 rounded-md shadow-md">
                        <input checked={card.check} onChange={() => handleCheck(card.id)} type="checkbox" className="cursor-pointer" />
                        <h1 style={{color: card.text}} className="text-[1rem] text-justify leading-6">{card.description}</h1>
                    </section>
                </div>
                ))
            }
        </>
    )
}