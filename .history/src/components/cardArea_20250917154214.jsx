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
                    <section key={card.id} style={{backgroundColor: card.bg}} className="w-[100%] flex flex-row items-s justify-start gap-2 h-auto p-2 border-0 rounded-md shadow-md">
                        <input checked={card.check} onChange={() => handleCheck(card.id)} type="checkbox" className="cursor-pointer" />
                        <h1 style={{color: card.text}} className="text-[1rem] text-justify leading-6">{card.description}</h1>
                    </section>
                ))
            }
        </>
    )
}