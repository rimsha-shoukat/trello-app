
export default function cardArea ({ cards }) {
    return (
        <>
            {cards && Array.isArray(cards) && cards.map((card) => (
                    <section key={card.id} style={{backgroundColor: card.bg}} className="w-[100%] flex flex-row h-auto p-2 border-0 rounded-md shadow-md">
                        <input type="checkbox"/>
                        <h1 style={{color: card.text}} className="text-[1rem] text-justify leading-6">{card.description}</h1>
                    </section>
                ))
            }
        </>
    )
}