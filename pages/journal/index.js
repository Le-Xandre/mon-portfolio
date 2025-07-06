// pages/journal/index.js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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

    return {
        props: {
            entries: entries.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1)),
        },
    };
}

export default function JournalIndex({ entries }) {
    const [readEntries, setReadEntries] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = JSON.parse(localStorage.getItem('readJDB') || '[]');
            setReadEntries(stored);
        }
    }, []);

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <Link
                href="/blog"
                className="inline-block mb-6 text-sm text-blue-600 dark:text-blue-400 hover:underline transition"
            >
                &larr; Retour au blog
            </Link>
            <h1 className="text-3xl font-bold mb-6">Journal de Bord</h1>
            <p className="text-sm glass-section text-gray-500 mb-8 italic">
                Fragments d’observation, pensées croisées et dérives algorithmiques.
            </p>
            <ul className="space-y-4">
                {entries.map(({ slug, frontmatter }) => (
                    <li key={slug}>
                        <Link
                            href={`/journal/${slug}`}
                            className={`block p-4 rounded bg-white/80 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-700 shadow-md transition flex justify-between items-center ${readEntries.includes(slug) ? 'opacity-50 grayscale' : ''
                                }`}
                        >
                            <div>
                                <h2 className="text-xl font-semibold">
                                    {frontmatter.title}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {frontmatter.date}
                                </p>
                                {frontmatter.description && (
                                    <p className="mt-1 text-sm italic opacity-75">
                                        {frontmatter.description}
                                    </p>
                                )}
                            </div>
                            {readEntries.includes(slug) && (
                                <span className="text-green-600 dark:text-green-400 font-bold">
                                    ✓ Lu
                                </span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
