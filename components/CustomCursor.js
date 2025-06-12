// components/CustomCursor.js
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor({ text = 'Voir' }) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const move = (e) => setPos({ x: e.clientX, y: e.clientY });
        const enter = () => setVisible(true);
        const leave = () => setVisible(false);

        document.addEventListener('mousemove', move);
        document.querySelectorAll('.gallery-hover-area').forEach((el) => {
            el.addEventListener('mouseenter', enter);
            el.addEventListener('mouseleave', leave);
        });

        return () => {
            document.removeEventListener('mousemove', move);
            document.querySelectorAll('.gallery-hover-area').forEach((el) => {
                el.removeEventListener('mouseenter', enter);
                el.removeEventListener('mouseleave', leave);
            });
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            style={{ x: pos.x - 30, y: pos.y - 30 }}
        >
            <div className="w-10 h-10 rounded-full border-2 border-pink-500 neon-glow bg-black bg-opacity-10 text-white-400 flex items-center justify-center text-xs font-semibold">
                {text}
            </div>
        </motion.div>
    );
}
