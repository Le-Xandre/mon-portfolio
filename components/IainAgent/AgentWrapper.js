// components/IainAgent/AgentWrapper.js
import { useState } from 'react';
import { motion } from 'framer-motion';
import AgentChat from './AgentChat';
import { BotIcon } from 'lucide-react';

export default function AgentWrapper() {
    const [isOpen, setIsOpen] = useState(false);

    const iconVariants = {
        idle: { y: [0, -4, 0], transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' } },
        hover: { scale: 1.1, transition: { duration: 0.2 } },
        tap: { scale: 0.9 }
    };

    return (
        <div className="fixed bottom-24 right-6 z-50">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 bg-black neon-glow opacity-60 hover:opacity-100 text-white rounded-full shadow-xl hover:bg-gray-800 transition-all"
                variants={iconVariants}
                initial="idle"
                animate="idle"
                whileHover="hover"
                whileTap="tap"
            >
                <BotIcon className="w-6 h-6 neon-glow" />
            </motion.button>

            {isOpen && <AgentChat onClose={() => setIsOpen(false)} />}
        </div>
    );
}
