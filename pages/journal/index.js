import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const ENTRIES_PER_PAGE = 3;

export async function getStaticProps() {
    const files = fs.readdirSync(path.join('content/journal'));

    const entries = files.map((filename) => {
        const slug = filename.replace('.md', '');
        const markdownWithMeta = fs.readFileSync(
            path.join('content/journal', filename),
            'utf-8'
        );
        const { data: frontmatter } = matter(markdownWithMeta);

        return {
            slug,
            frontmatter: {
                ...frontmatter,
                date: frontmatter.date.toString(),
            },
        };
    });

    // Tri par "order" si défini, sinon par date décroissante
    const sortedEntries = entries.sort((a, b) => {
        const orderA = Number(a.frontmatter.order ?? 9999); // défaut très grand si pas défini
        const orderB = Number(b.frontmatter.order ?? 9999);

        if (orderA !== orderB) {
            return orderA - orderB; // tri croissant par order
        }

        // Si même order, tri décroissant par date
        return a.frontmatter.date < b.frontmatter.date ? 1 : -1;
    });

    return {
        props: {
            entries: sortedEntries,
        },
    };
  
}

export default function JournalIndex({ entries }) {
    const [readEntries, setReadEntries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = JSON.parse(localStorage.getItem('readJDB') || '[]');
            setReadEntries(stored);
        }
    }, []);

    // Pagination locale
    const totalPages = Math.ceil(entries.length / ENTRIES_PER_PAGE);
    const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE;
    const currentEntries = entries.slice(startIndex, startIndex + ENTRIES_PER_PAGE);

    return (

        <div className="max-w-4xl mx-auto py-10 px-4">

            <Link
                href="/blog"
                className="inline-block mb-6 text-sm text-blue-600 dark:text-blue-400 hover:underline transition"
            >
                &larr; Retour au blog
            </Link>
            <h1 className="text-3xl font-bold mb-6">Journal de Bord - Page {currentPage}</h1>
            <p className="text-sm glass-section text-gray-500 mb-8 italic">
                Fragments d’observation, pensées croisées et dérives algorithmiques.
            </p>

            <ul className="space-y-4">
                {currentEntries.map(({ slug, frontmatter }) => (
                    <li key={slug}>
                        <Link
                            href={`/journal/${slug}`}
                            className={`block p-4 rounded bg-white/80 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-700 shadow-md transition flex justify-between items-center ${readEntries.includes(slug) ? 'opacity-50 grayscale' : ''
                                }`}
                        >
                            <div>
                                <h2 className="text-xl font-semibold">{frontmatter.title}</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{frontmatter.date}</p>
                                {frontmatter.description && (
                                    <p className="mt-1 text-sm italic opacity-75">{frontmatter.description}</p>
                                )}
                            </div>
                            {readEntries.includes(slug) && (
                                <span className="text-green-600 dark:text-green-400 font-bold">✓ Lu</span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Pagination simple */}
            <div className="flex justify-between items-center mt-8">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`text-blue-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    ← Précédent
                </button>
                {/* Barre de progression */}
                <div className="mt-4">
                    <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded">
                        <div
                            className="h-full bg-blue-500 dark:bg-blue-400 rounded transition-all duration-500"
                            style={{ width: `${(readEntries.length / entries.length) * 100}%` }}
                        />
                    </div>
                    <p className="text-xs mt-1 text-center text-gray-500 dark:text-gray-400">
                        {readEntries.length} sur {entries.length} entrées lues
                    </p>
                </div>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`text-blue-500 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Suivant →
                </button>
            </div>
        </div>
    );
}
