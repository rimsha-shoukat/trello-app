'use client';


export default function cardArea ({ cards }) {
    return (
        <>
            {cards && Array.isArray(cards) && cards.map((card) => (
                    <section key={card.id} style={{backgroundColor: card.bg}} className="w-[100%] flex flex-row items-s justify-start gap-2 h-auto p-2 border-0 rounded-md shadow-md">
                        <input checked={card.check} onClick={() => handleCheck(card.id)} type="checkbox" className="cursor-pointer" />
                        <h1 style={{color: card.text}} className="text-[1rem] text-justify leading-6">{card.description}</h1>
                    </section>
                ))
            }
        </>
    )
}