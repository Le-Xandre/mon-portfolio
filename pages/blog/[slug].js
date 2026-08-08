import rehypeRaw from 'rehype-raw';
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
        params: {
            slug: filename.replace('.md', ''),
        },
    }));

    return {
        paths,
        fallback: false,
    };
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
        .use(rehypeRaw)
        .use(rehypeExternalLinks, {
            target: '_blank',
            rel: ['noopener', 'noreferrer'],
        })
        .use(rehypeStringify)
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
        // ============================================================
        // LIGHTBOX — GALERIES .gallery
        // ============================================================

        const galleryListeners = [];

        const galleries = Array.from(
            document.querySelectorAll('.gallery')
        );

        galleries.forEach((gallery) => {
            const imgs = Array.from(
                gallery.querySelectorAll('img')
            );

            imgs.forEach((img, index) => {
                img.style.cursor = 'pointer';

                const handleClick = () => {
                    const groupSlides = imgs.map((image) => ({
                        src: image.src,
                    }));

                    setSlides(groupSlides);
                    setStartIndex(index);
                    setOpen(true);
                };

                img.addEventListener('click', handleClick);

                galleryListeners.push({
                    img,
                    handleClick,
                });
            });
        });

        // ============================================================
        // AUTRES IMAGES DU TEXTE
        // ============================================================

        const imageListeners = [];

        const allImages = Array.from(
            document.querySelectorAll(
                '.prose img:not(.gallery img)'
            )
        );

        allImages.forEach((img) => {
            img.style.maxWidth = '350px';
            img.style.cursor = 'pointer';

            const handleImageClick = () => {
                setSlides([
                    {
                        src: img.src,
                    },
                ]);

                setStartIndex(0);
                setOpen(true);
            };

            img.addEventListener('click', handleImageClick);

            imageListeners.push({
                img,
                handleImageClick,
            });
        });

        // ============================================================
        // SECRET FRAGMENT — 7 CLICS
        // ============================================================

        const secretListeners = [];

        const triggers = Array.from(
            document.querySelectorAll(
                '.secret-trigger[data-secret-id]'
            )
        );

        triggers.forEach((btn) => {
            const secretId = btn.dataset.secretId;

            const fragment = document.querySelector(
                `.secret-fragment[data-secret-id="${secretId}"]`
            );

            if (!fragment) return;

            const clicksNeeded = parseInt(
                btn.dataset.clicksNeeded || '7',
                10
            );

            const storageKey = `secret:${secretId}:count`;

            let count = parseInt(
                localStorage.getItem(storageKey) || '0',
                10
            );

            // État visuel initial
            if (count >= clicksNeeded) {
                fragment.classList.remove('hidden');
                fragment.setAttribute('aria-hidden', 'false');
                fragment.style.opacity = 1;
            } else {
                fragment.style.opacity = 0;
            }

            // Accessibilité clavier
            if (!btn.hasAttribute('tabindex')) {
                btn.tabIndex = 0;
            }

            const revealIfNeeded = () => {
                count += 1;

                localStorage.setItem(
                    storageKey,
                    String(count)
                );

                btn.dataset.count = String(count);

                // Petit retour visuel
                try {
                    btn.animate(
                        [
                            { transform: 'scale(1)' },
                            { transform: 'scale(1.06)' },
                            { transform: 'scale(1)' },
                        ],
                        {
                            duration: 160,
                        }
                    );
                } catch (e) {
                    // Animation non disponible
                }

                if (count >= clicksNeeded) {
                    fragment.classList.remove('hidden');

                    fragment.setAttribute(
                        'aria-hidden',
                        'false'
                    );

                    fragment.style.transition =
                        'opacity 400ms ease';

                    fragment.style.opacity = 1;
                }
            };

            const onClick = (e) => {
                e.preventDefault();
                revealIfNeeded();
            };

            const onKey = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    revealIfNeeded();
                }
            };

            btn.addEventListener('click', onClick);
            btn.addEventListener('keydown', onKey);

            secretListeners.push({
                btn,
                onClick,
                onKey,
            });
        });

        // ============================================================
        // NETTOYAGE
        // ============================================================

        return () => {
            galleryListeners.forEach(
                ({ img, handleClick }) => {
                    img.removeEventListener(
                        'click',
                        handleClick
                    );
                }
            );

            imageListeners.forEach(
                ({ img, handleImageClick }) => {
                    img.removeEventListener(
                        'click',
                        handleImageClick
                    );
                }
            );

            secretListeners.forEach(
                ({ btn, onClick, onKey }) => {
                    btn.removeEventListener(
                        'click',
                        onClick
                    );

                    btn.removeEventListener(
                        'keydown',
                        onKey
                    );
                }
            );
        };
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

                <div
                    dangerouslySetInnerHTML={{
                        __html: contentHtml,
                    }}
                />

                {/* ====================================================
                    VISUELS LIÉS À ECHO-7
                ==================================================== */}

                {frontmatter.images?.map((src, i) => (
                    <div
                        key={i}
                        className={`flex flex-col md:flex-row items-center my-8 gap-4 ${
                            i % 2 === 0
                                ? ''
                                : 'md:flex-row-reverse'
                        }`}
                    >
                        <img
                            src={src}
                            alt={`Fragment visuel ${i + 1}`}
                            className="w-full md:w-1/3 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition"
                            onClick={() => {
                                setSlides(
                                    frontmatter.images.map(
                                        (img) => ({
                                            src: img,
                                        })
                                    )
                                );

                                setStartIndex(i);
                                setOpen(true);
                            }}
                        />

                        <p className="text-sm text-gray-600 italic">
                            Vision #{i + 1} — Echo-7 a intercepté ce fragment à travers les couches.
                        </p>
                    </div>
                ))}

                {/* ====================================================
                    LIGHTBOX
                ==================================================== */}

                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={slides}
                    index={startIndex}
                    plugins={[
                        Fullscreen,
                        Zoom,
                        Slideshow,
                    ]}
                />

            </article>
        </>
    );
}
