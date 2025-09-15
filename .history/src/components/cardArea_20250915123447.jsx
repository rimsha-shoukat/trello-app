
export default function cardArea({ cards }) {
    return (
        <>
            {cards && Array.isArray(cards) && cards.map((card) => {
                    <section style={{backgroundColor: card.bg}} className="w-[100%] h-auto p-2 border-0 r">
                        <input type="checkbox" value={card.description} style={{color: card.text}} className="text-[1rem] text-justify leading-6"/>
                    </section>
                })
            }
        </>
    )
}