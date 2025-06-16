import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath } from '../lib/assets';

export default function Home() {
    return (
        <div className="relative inset-0 -z-10 min-h-[78vh] w-full h-full px-4 py-10 flex flex-col items-center justify-center overflow-hidden">
           
            {/* Contenu principal animé */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="glass-section max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 p-6 md:p-10"
            > {/* Fond personnalisé pour masquer les thèmes */}
            <div
                    className="absolute glass-section inset-0 -z-10 bg-cover bg-center"
                style={{
                    backgroundImage: `url('${getAssetPath('/images/bg03.png')}')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    opacity: 0.6,
                    backgroundColor: '#000', // masque le thème
                    backgroundBlendMode: 'overlay',
                }}
            >
                {/* Voile noir semi-transparent */}
                    <div className="absolute glass-section inset-0 bg-black opacity-60"></div>

                {/* Bruit animé */}
                <div
                        className="absolute glass-section inset-0 pointer-events-none animate-noise"
                    style={{
                        backgroundImage: `url('${getAssetPath('/images/bg02.png')}')`,
                        backgroundSize: 'cover',
                    }}
                />
            </div>

                {/* Avatar */}
                <div className="relative group">
                    <div className="avatar overflow-hidden border-4 border-cyan-400 shadow-xl animate-noise">
                        <Image
                            src={getAssetPath('/images/profil.png')}
                            alt="Mon portrait"
                            width={140}
                            height={140}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* Texte, bouton, tagline */}
                <div className="flex-1 text-center md:text-left space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold glitch-text text-white">
                        @Hell~Xandre
                    </h1>
                    <p className="text-lg text-gray-300 font-light">
                        Créateur d’expériences web immersives
                    </p>

                    {/* Bouton centré */}
                    <Link
                        href="#projects"
                        className="block w-fit mx-auto md:mx-0 px-4 py-2 rounded-lg neon-box neon-glow bg-gradient-to-r from-cyan-600 to-blue-500 text-white font-semibold border-2 border-cyan-400 shadow-md transition-transform hover:scale-105 hover:from-pink-400 hover:to-purple-500"
                    >
                        Découvre mes projets
                    </Link>

                    {/* Tagline */}
                    <div className="text-xs tracking-widest uppercase text-gray-400 pt-4">
                        • Impressive Design • Innovative Solutions •
                    </div>
                </div>
            </motion.div>

            {/* Animation bruit */}
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
