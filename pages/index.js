// File: pages/index.js
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "../lib/assets";
import CustomBackground from "../components/CustomBackground";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative flex flex-col neon-glow avatar-halo items-center justify-start text-center overflow-hidden px-4 pt-20 pb-20"
    >
        

          <div className="relative neon-box neon-glow z-10 glass-section max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 p-8 md:p-10">
        {/* Avatar with halo and neon-glow */}  <CustomBackground />
        <div className="relative group flex-shrink-0 neon-glow">
                  <div className="neon-glow avatar-halo overflow-hidden border-4 border-cyan-400  shadow-lg avatar border-4 border-cyan-400 shadow-xl transition-transform duration-300">
            <Image
              src={getAssetPath("/images/profil.png")}
              alt="Mon portrait"
              width={160}
              height={160}
                          className="object-cover noise-overlay neon-glow avatar-halo w-full h-full transition-transform duration-300"
            />
          </div>
        </div>
 
        {/* Texte & Bouton */}
        <div className="flex-1 text-white space-y-4">
          {/* Glitch effect tested on pseudo */}
          <h1 className="text-4xl md:text-6xl font-bold animate-noise glitch-text hover:glitch-text">
            @Hell~Xandre
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300">
            Créateur d’expériences web immersives
          </p>

          <Link
            href="#projects"
            className="mt-4 inline-block px-8 py-4 rounded-xl neon-box neon-glow bg-gradient-to-r from-cyan-600 to-blue-500 font-semibold border-2 border-cyan-400 shadow-md transition-transform hover:scale-110"
          >
            Découvre mes projets
          </Link>

          <div className="mt-6 text-xs tracking-widest uppercase text-gray-400">
           <br></br> • Impressive Design • Innovative Solutions •
          </div>
        </div>
      </div>

      {/* Halo & noise CSS adjustments */}
      <style jsx>{`
        .avatar-halo::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(0,255,255,0.5) 0%, transparent 80%);
          transform: translate(-50%, -50%);
          filter: blur(6px);
          z-index: -1;
        }
      `}</style>
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
    </motion.div>
  );
}