
a ({ cards }) {
    return (
        <>
           
        </>
    )
}
'use client';
import { useState } from 'react';

export default function cardArea({ cards }) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
     {cards && Array.isArray(cards) && cards.map((card) => (
                    <section key={card.id} style={{backgroundColor: card.bg}} className="w-[100%] flex flex-row items-center justify-start gap-2 h-auto p-2 border-0 rounded-md shadow-md">
                        
                    </section>
                ))
            }
    
  );
}
