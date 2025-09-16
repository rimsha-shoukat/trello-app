
export default function cardArea ({ cards }) {
    return (
        <>
            {cards && Array.isArray(cards) && cards.map((card) => (
                    <section key={card.id} style={{backgroundColor: card.bg}} className="w-[100%] flex flex- h-auto p-2 border-0 rounded-md shadow-md">
                        <input type="checkbox" style={{color: card.text}} className="text-[1rem] text-justify leading-6"/>
                        <h1>{card.description}</h1>
                    </section>
                ))
            }
        </>
    )
}