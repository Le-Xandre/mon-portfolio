import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { useState, useEffect } from 'react';
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
    const markdownWithMeta = fs.readFileSync(path.join('content/blog', slug + '.md'), 'utf-8');
    const { data: frontmatter, content } = matter(markdownWithMeta);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        props: {
            frontmatter,
            contentHtml,
        },
    };
}

export default function Post({ frontmatter, contentHtml }) {
    const [open, setOpen] = useState(false);
    const [slides, setSlides] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        // 🔎 Sélectionner toutes les images dans les galeries
        const galleries = document.querySelectorAll('.gallery');
        galleries.forEach((gallery) => {
            const imgs = gallery.querySelectorAll('img');
            imgs.forEach((img, index) => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    // Créer les slides pour le lightbox
                    const groupSlides = Array.from(imgs).map((i) => ({
                        src: i.src,
                    }));
                    setSlides(groupSlides);
                    setStartIndex(index);
                    setOpen(true);
                });
            });
        });

        // 🔎 Pour toutes les autres images hors-galeries
        const allImages = document.querySelectorAll('.prose img:not(.gallery img)');
        allImages.forEach((img) => {
            img.style.maxWidth = '300px'; // Limite la taille
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                setSlides([{ src: img.src }]);
                setStartIndex(0);
                setOpen(true);
            });
        });
    }, [contentHtml]);

    return (
        <article className="prose dark:prose-dark max-w-2xl mx-auto py-20">
            <img
                src={frontmatter.coverImage || '/default.jpg'}
                alt={frontmatter.title}
                className="w-full h-auto max-h-60 object-cover mb-4 rounded shadow"
            />
            <h1>{frontmatter.title}</h1>
            <p><em>{frontmatter.date}</em></p>
            <div
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                index={startIndex}
                plugins={[Fullscreen, Zoom, Slideshow]}
            />
        </article>
    );
}
