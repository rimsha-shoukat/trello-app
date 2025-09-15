
export default function cardArea({ cards }) {
    return (
        <>
            {cards && Array.isArray(cards) && cards.map((card) => {
                    <section style={{backgroundColor: card.bg}} className="w-[100%] h-auto p-2 ">
                        <p style={{color: card.text}} className="text-[1rem]">{card.description}</p>
                    </section>
                })
            }
        </>
    )
}