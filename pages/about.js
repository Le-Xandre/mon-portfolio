import React, { useEffect } from "react";
import AProposAnimated from '/components/AProposAnimated'

export default function About() {
    return (
        <main className="glass-section py-10 max-w-6xl mx-auto my-8 dark:bg-gray-800">
            <h2 className="neon-glow text-gray-900 dark:text-white text-xl md:text-4xl text-center font-semibold mb-4 text-lime-200">
            À propos
            </h2>
            <AProposAnimated />
        </main>
    )
}

