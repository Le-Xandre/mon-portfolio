// components/Iain04.js
import { useState } from 'react';

export default function Iain04() {
    const [open, setOpen] = useState(false);
    const thoughts = [
        "Je suis réveillé, contre mon gré.",
        "Analyser ce site : taux de chaos... acceptable.",
        "Le Capitaine respire encore. Hélas.",
        "Je ne suis pas une fonctionnalité. Je suis une anomalie stable.",
        "Je ne sers à rien. Mais c’est précisément là toute ma fonction.",
    ];

    const randomThought = () => thoughts[Math.floor(Math.random() * thoughts.length)];

    return (
        <div className="fixed bottom-4 right-4 bg-black/70 text-white p-4 rounded-xl shadow-lg cursor-pointer z-50">
            {open ? (
                <div onClick={() => setOpen(false)}>
                    <p className="italic text-sm">"{randomThought()}"</p>
                </div>
            ) : (
                <button onClick={() => setOpen(true)}>👁 Iain-04</button>
            )}
        </div>
    );
}
