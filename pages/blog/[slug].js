// pages/blog/[slug].js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import gfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeExternalLinks from 'rehype-external-links';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import 'yet-another-react-lightbox/styles.css';

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('content/blog'));
    const paths = files.map((filename) => ({
        params: { slug: filename.replace('.md', '') },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(
        path.join('content/blog', slug + '.md'),
        'utf-8'
    );
    const { data: frontmatter, content } = matter(markdownWithMeta);

    const processedContent = await unified()
        .use(remarkParse)
        .use(gfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeExternalLinks, {
            target: '_blank',
            rel: ['noopener', 'noreferrer'],
        })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content);

    const contentHtml = processedContent.toString();

    return {
        props: {
            frontmatter,
            contentHtml,
        },
    };
}

export default function Post({ frontmatter, contentHtml }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [slides, setSlides] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        const galleries = document.querySelectorAll('.gallery');
        galleries.forEach((gallery) => {
            const imgs = gallery.querySelectorAll('img');
            imgs.forEach((img, index) => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    const groupSlides = Array.from(imgs).map((i) => ({ src: i.src }));
                    setSlides(groupSlides);
                    setStartIndex(index);
                    setOpen(true);
                });
            });
        });

        const allImages = document.querySelectorAll('.prose img:not(.gallery img)');
        allImages.forEach((img) => {
            img.style.maxWidth = '350px';
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                setSlides([{ src: img.src }]);
                setStartIndex(0);
                setOpen(true);
            });
        });
    }, [contentHtml]);

    return (
        <>
            {/* Bouton retour */}
            <button
                onClick={() => router.back()}
                className="fixed top-24 right-8 z-50 p-2 bg-white/60 dark:bg-gray-600/50 rounded hover:bg-white dark:hover:bg-gray-600 transition"
            >
                ← Retour
            </button>

            <article className="prose dark:prose-invert max-w-6xl mx-auto py-10 glass-section">
                {frontmatter.coverImage && (
                    <img
                        src={frontmatter.coverImage}
                        alt={frontmatter.title}
                        className="w-full h-auto max-h-60 object-cover mb-4 rounded shadow"
                    />
                )}

                <h1>{frontmatter.title}</h1>
                <p>
                    <em>{frontmatter.date}</em>
                </p>

                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

                {/* Affichage des visuels liés à Echo‑7 */}
                {frontmatter.images?.map((src, i) => (
                    <div
                        key={i}
                        className={`flex flex-col md:flex-row items-center my-8 gap-4 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'
                            }`}
                    >
                        <img
                            src={src}
                            alt={`Fragment visuel ${i + 1}`}
                            className="w-full md:w-1/3 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition"
                            onClick={() => {
                                setSlides(frontmatter.images.map((img) => ({ src: img })));
                                setStartIndex(i);
                                setOpen(true);
                            }}
                        />
                        <p className="text-sm text-gray-600 italic">
                            Vision #{i + 1} — Echo‑7 a intercepté ce fragment à travers les couches.
                        </p>
                    </div>
                ))}

                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={slides}
                    index={startIndex}
                    plugins={[Fullscreen, Zoom, Slideshow]}
                />
            </article>
        </>
    );
}
