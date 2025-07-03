import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import agentData from './agentData';

export default function AgentChat({ onClose }) {
    const [messages, setMessages] = useState([
        { from: 'agent', text: agentData.intro }
    ]);
    const [input, setInput] = useState('');
    const endRef = useRef(null);

    const sendMessage = () => {
        if (!input.trim()) return;
        const userMsg = { from: 'user', text: input };
        const response = agentData.getResponse(input);
        setMessages(prev => [...prev, userMsg, { from: 'agent', text: response }]);
        setInput('');
    };

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <motion.div
            className="w-80 h-96 bg-white rounded-xl shadow-2xl p-4 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Iain-04 est en ligne</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-black">×</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
                <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: msg.from === 'agent' ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: msg.from === 'agent' ? -20 : 20 }}
                            transition={{ duration: 0.2 }}
                            className={`text-sm px-2 py-1 rounded ${msg.from === 'agent'
                                    ? 'bg-blue-100 text-blue-700 self-start'
                                    : 'bg-gray-200 text-gray-800 self-end'
                                }`}
                        >
                            {msg.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={endRef} />
            </div>

            <div className="mt-2 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Une question, Capitaine ?"
                    className="flex-1 border rounded px-2 py-1 text-sm"
                />
                <button
                    onClick={sendMessage}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                    Envoyer
                </button>
            </div>
        </motion.div>
    );
}
