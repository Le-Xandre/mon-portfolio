// components/glow.js
import { useEffect } from 'react';

export default function useGlow() {
    useEffect(() => {
        const selector = '.glow-hover, .gallery img, .projects img';
        const els = () => Array.from(document.querySelectorAll(selector));

        const onMouseMove = (e) => {
            els().forEach((el) => {
                const rect = el.getBoundingClientRect();
                // position relative au coin supérieur gauche de l'élément
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                el.style.setProperty('--x', `${x}px`);
                el.style.setProperty('--y', `${y}px`);
                // couleur fixe violet
                el.style.setProperty('--glow-color', 'rgba(216,36,251,0.5)');
            });
        };

        document.addEventListener('mousemove', onMouseMove);
        return () => document.removeEventListener('mousemove', onMouseMove);
    }, []);
}
