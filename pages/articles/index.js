import fs from 'fs';
import path from 'path';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import matter from 'gray-matter';
import { useRouter } from 'next/router';

const POSTS_PER_PAGE = 3; // ici 3 articles par page

export async function getStaticProps() {
    const postsDirectory = path.join(process.cwd(), 'content', 'blog');
    const filenames = fs.readdirSync(postsDirectory);

    const posts = filenames.map((filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        return {
            slug: filename.replace(/\.md$/, ''),
            ...data,
        };
    });

    const sortedPosts = posts.sort((a, b) => a.order - b.order);

    return {
        props: {
            posts: sortedPosts,
        },
    };
}

export default function ArticleList({ posts }) {
    const router = useRouter();
    const [readArticles, setReadArticles] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('readArticles');
        if (stored) {
            setReadArticles(JSON.parse(stored));
        }
    }, []);

    const markAsRead = (slug) => {
        const updated = [...new Set([...readArticles, slug])];
        setReadArticles(updated);
        localStorage.setItem('readArticles', JSON.stringify(updated));
    };

    // découpage des articles en "pages" de 3
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

    // changer de page
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 relative">
            <h1 className="text-3xl font-bold mb-6">Articles - Page {currentPage}</h1>
            {/* Bouton Retour fixe */}
            <button
                onClick={() => router.push('/blog')}
                className="fixed top-24 right-8 z-50 p-2 bg-white/60 dark:bg-gray-800/60 rounded hover:bg-white dark:hover:bg-gray-800 transition"
            >
                ← Retour
            </button>
            <ul className="space-y-6">
                {currentPosts.map(({ slug, title, date, description }) => (
                    <li key={slug} className="border p-4 rounded-xl shadow bg-white dark:bg-zinc-800">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        <p className="text-sm text-zinc-500">{date}</p>
                        <p className="mt-2">{description}</p>
                        <div className="mt-4 flex justify-between items-center">
                            <Link href={`/blog/${slug}`}>
                                <button
                                    className="text-blue-600 hover:underline"
                                    onClick={() => markAsRead(slug)}
                                >
                                    {readArticles.includes(slug) ? 'Relire' : 'Lire'}
                                </button>
                            </Link>
                            {readArticles.includes(slug) && (
                                <span className="text-green-500 text-sm">✓ Lu</span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {/* Navigation simple entre pages */}
            <div className="flex justify-between items-center mt-8">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`text-blue-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    ← Précédent
                </button>
                <div className="mt-4">
                    <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded">
                        <div
                            className="h-full bg-blue-500 dark:bg-blue-400 rounded transition-all duration-500"
                            style={{ width: `${(readArticles.length / posts.length) * 100}%` }}
                        />
                    </div>
                    <p className="text-xs mt-1 text-center text-gray-500 dark:text-gray-400">
                        {readArticles.length} sur {posts.length} articles lus
                    </p>
                </div>
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`text-blue-500 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Suivant →
                </button>
            </div>

        </div>
    );
}
