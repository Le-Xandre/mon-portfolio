import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import gfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeExternalLinks from 'rehype-external-links';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import 'yet-another-react-lightbox/styles.css';

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('content/journal'));
    const paths = files.map((filename) => ({
        params: { id: filename.replace('.md', '') },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params: { id } }) {
    const markdown = fs.readFileSync(
        path.join('content/journal', `${id}.md`),
        'utf-8'
    );
    const { data: frontmatter, content } = matter(markdown);

    if (frontmatter.date instanceof Date) {
        frontmatter.date = frontmatter.date.toISOString().split('T')[0];
    }

    const processed = await unified()
        .use(remarkParse)
        .use(gfm)
        .use(remarkRehype)
        .use(
            rehypeExternalLinks,
            { target: '_blank', rel: ['noopener', 'noreferrer'] }
        )
        .use(rehypeStringify)
        .process(content);

    return {
        props: {
            frontmatter,
            contentHtml: processed.toString(),
        },
    };
}

export default function JournalEntry({ frontmatter, contentHtml }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [slides, setSlides] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        document.querySelectorAll('.gallery').forEach((gallery) => {
            const imgs = gallery.querySelectorAll('img');
            imgs.forEach((img, idx) => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    setSlides(Array.from(imgs).map((i) => ({ src: i.src })));
                    setStartIndex(idx);
                    setOpen(true);
                });
            });
        });
    }, [contentHtml]);

    return (
        <>

            <article className="prose dark:prose-invert max-w-6xl mx-auto py-10 glass-section">
                {frontmatter.coverImage && (
                    <img
                        src={frontmatter.coverImage}
                        alt={frontmatter.title}
                        className="w-full h-auto max-h-60 object-cover mb-4 rounded shadow"
                    />
                )}

                <h1>{frontmatter.title}</h1>
                <p><em>{frontmatter.date}</em></p>

                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={slides}
                    index={startIndex}
                    plugins={[Fullscreen, Zoom, Slideshow]}
                />
            </article>
            {/* Fixed back button */}
            <button
                onClick={() => router.push('/journal')}
                className="fixed top-24 right-8 z-50 p-2 bg-white/60 dark:bg-gray-800/60 rounded hover:bg-white dark:hover:bg-gray-800 transition"
            >
                ← Retour
            </button>
        </>
    );
}
