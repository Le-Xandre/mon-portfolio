import { useEffect, useRef } from 'react';
import { getAssetPath } from '../lib/assets';

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

    const colors = {
        classic: '#c49b66',
        steampunk: '#b87333',
        cyberpunk: '#0ff',
    };

    const strokeColor = colors[theme] || colors.classic;

    const steampunkBg = `url(${getAssetPath('/textures/steampunk-bg3.png')}), url(${getAssetPath('/textures/steampunk-overlay.png')})`;
    const cyberpunkBg = `${steampunkBg}, radial-gradient(circle, #0ff, #003)`;

    return (
        <div
            className="flex justify-center p-4 rounded-xl"
            style={{
                backgroundImage:
                    theme === 'steampunk'
                        ? steampunkBg
                        : theme === 'cyberpunk'
                            ? cyberpunkBg
                            : 'transparent',
                backgroundSize: 'contain',
                minHeight: '150px',
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="150" height="150">
                <circle cx="50" cy="50" r="45" stroke={strokeColor} strokeWidth="5" fill="none" />
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
