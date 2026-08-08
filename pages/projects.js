// pages/projects.js

import { motion } from 'motion/react';
import { FiArrowRight } from 'react-icons/fi';
import { getAssetPath } from '../lib/assets';

const projects = [
    {
        title: 'Linktree',
        description: 'Page personnelle regroupant différents liens, projets, créations et espaces du portfolio.',
        image: getAssetPath('/images/project-a.png'),
        tech: ['HTML', 'CSS', 'JavaScript'],
        link: {
            url: 'https://le-xandre.github.io/Vitrine-Portfolio/linktree.html',
            label: '🔗 Visiter le Linktree'
        }
    },
    {
        title: 'Portfolio photo expérimental',
        description: 'Ancienne vitrine photographique et espace regroupant différentes créations et expérimentations.',
        image: getAssetPath('/images/project-a.png'),
        tech: ['HTML', 'CSS', 'JavaScript'],
        link: {
            url: 'https://le-xandre.github.io/Vitrine-Portfolio/Portfolio.html',
            label: '📷 Voir le portfolio'
        }
    },
    {
        title: 'C.77 — Cyberpunk Interface',
        description: 'Expérimentation web interactive inspirée de l’univers Cyberpunk 2077.',
        image: getAssetPath('/images/project-a.png'),
        tech: ['HTML', 'CSS', 'JavaScript'],
        link: {
            url: 'https://le-xandre.github.io/essaibis/',
            label: '🖥️ Explorer C.77'
        }
    },
    {
        title: 'Perceptions & Illusions',
        description: 'Expérimentation interactive autour de la perception, de la synesthésie et des illusions optiques.',
        image: getAssetPath('/images/project-a.png'),
        tech: ['HTML', 'CSS', 'JavaScript'],
        link: {
            url: 'https://le-xandre.github.io/Vitrine-Portfolio/HTMLPage1.html',
            label: '🎨 Explorer l’expérience'
        }
    }
];

export default function Projects() {
    return (
        <section id="projects" className="glass-section py-10 max-w-6xl mx-auto my-8 dark:bg-gray-800">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="neon-glow text-gray-900 dark:text-white text-xl md:text-4xl text-center font-semibold mb-4 text-lime-200">
                    Mes Projets
                </h2>

                <div className="mt-12 grid gap-8 sm:grid-cols-2">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="glow-card rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
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

                                <div className="mt-4 text-sm text-gray-500 flex flex-wrap gap-2 max-w-xs">
                                    <strong className="w-full">Techniques :</strong>
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs whitespace-nowrap">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Lien vers le projet */}
                                {project.link?.url !== '#' ? (
                                    <a
                                        href={project.link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 inline-flex text-center items-center gap-2 text-cyan-400 hover:text-pink-400 transition duration-300"
                                    >
                                        {project.link.label || 'Voir le projet'}
                                        <FiArrowRight className="transform transition-transform group-hover:translate-x-1" />
                                    </a>
                                ) : (
                                    <span className="mt-6 inline-flex text-center items-center gap-2 text-gray-500 cursor-not-allowed">
                                        {project.link.label || 'Bientôt disponible'}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
