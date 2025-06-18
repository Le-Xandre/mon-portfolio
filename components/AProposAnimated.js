
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const lines = [
    "Hello ♥",
    "Je m’appelle Alex.",
    "Ayant un passif en Histoire de l'art mais aussi en Arts Plastiques,",
    "mes compétences incluent la création de concepts visuels & d'illustrations.",
    "Je suis également un développeur passionné par les technologies web modernes.",
    "J'aime créer des interfaces utilisateur ",
    "qui j'espère sont élégantes, performantes et accessibles.",
    "Enjoy & bonne visite à vous ♥ ",
]
export default function AProposAnimated() {
    const [visibleLines, setVisibleLines] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (isOpen && visibleLines < lines.length) {
            const timeout = setTimeout(() => {
                setVisibleLines((v) => v + 1)
            }, 1800)
            return () => clearTimeout(timeout)
        }
    }, [visibleLines, isOpen])

    const toggleBox = () => {
        if (!isOpen) setVisibleLines(0)
        setIsOpen(!isOpen)
    }

    return (
        <div className="max-w-4xl mx-auto mt-4 p-4 text-center">
                  <button
                animate={{ opacity: 0.9, height: 'auto' }}
                onClick={toggleBox}
                className="glass-section opacity-80 mb-8 px-4 py-4 rounded-full border border-lime-500 text-lime-200 hover:bg-lime-800 hover:text-white transition"
            >
                {isOpen ? 'Fermer' : 'Ouvrir'} À propos
            </button> 

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0.9, height: 0 }}
                        animate={{ opacity: 0.9, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border border-neutral-700 bg-neutral-900 bg-opacity-30 rounded-2xl shadow-xl px-4 py-4"
                    >
                        <h2 className="text-4xl font-extrabold text-center neon-glow text-gray-900 dark:text-white text-lime-200 mb-8">
                            ✴ À propos ✴
                        </h2>
                        <div className="space-y-2 font-mono text-lime-100 text-left">
                            {lines.slice(0, visibleLines).map((line, idx) => (
                                <motion.p
                                    key={idx}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center whitespace-pre-wrap"
                                >
                                    {line}
                                </motion.p>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
 </div>
    )
}
