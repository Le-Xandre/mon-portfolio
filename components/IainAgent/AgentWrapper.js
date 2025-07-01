// components/IainAgent/AgentWrapper.js
import { useState } from 'react';
import AgentChat from './AgentChat';
import { BotIcon } from 'lucide-react';


export default function AgentWrapper() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-24 right-6 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 bg-black neon-glow opacity-60 hover:opacity-100 text-white rounded-full shadow-xl hover:bg-gray-800 transition-all"
            >
                <BotIcon className="w-6 h-6 neon-glow" />
            </button>
            {isOpen && <AgentChat onClose={() => setIsOpen(false)} />}
        </div>
    );
}
