// pages/projects.js

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi'; // Flèche
import { getAssetPath } from '../lib/assets'; // ✅ Ajout


const projects = [
    {
        title: 'Projet A',
        description: 'Description courte du projet A.',
        image: getAssetPath('/images/project-a.png') ,
        tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
        link: '#'
    },
    {
        title: 'Projet B',
        description: 'Description courte du projet B.',
        image: getAssetPath('/images/project-a.png'),
        tech: ['React', 'Node.js', 'Express'],
        link: '#'
    },
];

export default function Projects() {
    return (
        <section id="projects" className="glass-section py-10 max-w-6xl mx-auto my-10 max-w-4xl mx-auto dark:bg-gray-800">

            {/* Vidéo de fond en fixed pour ne pas impacter le flux  
                <video
                src="/videos/0_Futuristic_Technology_3840x2160.mov"
                autoPlay
                muted
                loop
                playsInline
                className="absolute overflow-hidden opacity-20"
            />
            */}
           

            <div className="max-w-4xl mx-auto px-4">
                <h2 className="neon-glow text-gray-900 dark:text-white text-xl md:text-4xl text-center font-semibold mb-4 text-lime-200">
                    Mes Projets
                </h2>
                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="glow-card rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            {/* Image avec effet hover */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-24 object-cover transition-transform duration-300 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition duration-300"></div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl text-center font-semibold text-gray-900 dark:text-white">
                                    {project.title}
                                </h3>
                                <p className="mt-4 text-gray-600 dark:text-gray-300">{project.description}</p>
                                <p className="mt-4 text-sm text-gray-500">
                                    <strong>Techniques :</strong> {project.tech.join(', ')}
                                </p>

                                {/* Bouton avec flèche animée */}
                                <Link
                                    href={project.link}
                                    className="mt-6 inline-flex text-center items-center gap-2 text-cyan-400 hover:text-pink-400 transition duration-300"
                                >
                                    Voir le projet
                                    <FiArrowRight className="transform transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
