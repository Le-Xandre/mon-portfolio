import { useEffect, useRef } from 'react';


export default function Gauge({ theme }) {
    const needleRef = useRef(null);

    useEffect(() => {
        let angle = 0;
        let animationFrameId;

        const animate = () => {
            angle = (angle + 1) % 360;
            if (needleRef.current) {
                needleRef.current.setAttribute('transform', `rotate(${angle} 50 50)`);
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    // Choix des couleurs selon le thème
    const colors = {
        classic: '#c49b66',
        steampunk: '#b87333', // cuivre rouillé
        cyberpunk: '#0ff',    // néon cyan
    };

    const strokeColor = colors[theme] || colors.classic;

    // Choix de l'image de fond principale
    const bgImage =
        theme === 'steampunk'
            ? "url('/textures/steampunk-bg.png')"
            : theme === 'cyberpunk'
                ? 'radial-gradient(circle, #0ff, #003)'
                : 'transparent';

    return (
        <div
            className={`flex justify-center p-4 rounded-xl`}
            style={{
                backgroundImage:
                    theme === 'steampunk'
                        ? "url('/textures/steampunk-bg3.png') , url('/textures/steampunk-overlay.png')" // ajoute cette image dans /public/textures/
                        : theme === 'cyberpunk'
                            ? "url('/textures/steampunk-bg3.png') , url('/textures/steampunk-overlay.png') , radial-gradient(circle, #0ff, #003)"
                            : 'transparent',
                backgroundSize: 'contain',
                minHeight: '150px' // Ajuste selon tes besoins
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="150"
                height="150"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke={strokeColor}
                    strokeWidth="5"
                    fill="none"
                />
                <line
                    ref={needleRef}
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="20"
                    stroke={strokeColor}
                    strokeWidth="5"
                    id="needle"
                />
            </svg>

        </div>

    );
}
