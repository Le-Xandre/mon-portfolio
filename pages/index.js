// pages/index.js
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
    return (
        <div className="relative max-w-8xl mx-auto py-30 px-4 bg-black min-h-[78vh] flex flex-col overflow-hidden">
            {/* Background image */}
            <div
                className="absolute top-0 left-0 w-full h-full max-h-[78vh] bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/bg03.png')",
                    backgroundSize: 'contain',
                    mixBlendMode: 'screen',
                }}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

                {/* Calque noise animé */}
                <div
                    className="absolute top-0 left-0 w-full h-full pointer-events-none animate-noise"
                    style={{
                        backgroundImage: "url('/images/bg02.png')",
                        backgroundSize: 'cover',
                        opacity: 0.2,
                        mixBlendMode: 'screen',
                    }}
                ></div>
            </div>

            {/* Contenu centré */}
            <motion.div
                className="flex flex-1 items-center justify-center text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="glassmorphism-card flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-5xl font-extrabold glitch-text text-white mb-4">@Hell~Xandre</h1>
                        <p className="text-lg text-gray-300 mb-4 font-light">Créateur d’expériences web immersives</p>
                        <Link
                                href="#projects"
                            className="inline-block px-6 py-3 text-bretagneBlue rounded-lg neon-glow neon-box text-white bg-gradient-to-r from-cyan-600 to-blue-500 shadow-lg hover:from-pink-400 hover:to-purple-500 overflow-hidden border-4 border-cyan-400 shadow-xl group-hover:scale-105 group-hover:shadow-pink-400 transition-transform duration-300"
                            >
                        
                                Découvre mes projets
                            
                        </Link>       
                    </div>

                    {/* Avatar */}
                    <div className="flex-shrink-0 relative group">
                        <div className="avatar animate-noise overflow-hidden border-4 border-cyan-400 shadow-xl transition-transform duration-300">
                            <Image
                                src="/images/profil.png"
                                alt="Mon portrait"
                                width={200}
                                height={200}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Footer tagline */}
            <div className="text-center text-xs tracking-widest uppercase text-gray-400 py-1">
                <span>Impressive Design • Innovative Solutions •</span>
            </div>

            {/* Styles pour l’animation noise et glow */}
            <style jsx>{`
                @keyframes noiseFlicker {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                        filter: drop-shadow(0 0 5px cyan) drop-shadow(0 0 10px pink);
                    }
                    25% {
                        transform: translate(-1px, 1px) scale(1.01);
                        opacity: 0.75;
                        filter: drop-shadow(0 0 5px magenta) drop-shadow(0 0 10px blue);
                    }
                    50% {
                        transform: translate(1px, -1px) scale(1.02);
                        opacity: 0.55;
                        filter: drop-shadow(0 0 5px cyan) drop-shadow(0 0 10px purple);
                    }
                    75% {
                        transform: translate(-1px, -1px) scale(1.01);
                        opacity: 0.75;
                        filter: drop-shadow(0 0 5px pink) drop-shadow(0 0 10px cyan);
                    }
                    100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                        filter: drop-shadow(0 0 5px cyan) drop-shadow(0 0 10px magenta);
                    }
                }

                .animate-noise {
                    animation: noiseFlicker 3s infinite linear alternate;
                }
            `}</style>
        </div>
    );
}
