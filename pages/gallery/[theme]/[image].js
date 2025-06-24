// pages/gallery/[theme]/[image].js
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export async function getStaticPaths() {
    const imagesDir = path.join(process.cwd(), 'public/images');
    const themes = fs.readdirSync(imagesDir).filter((folder) => {
        const fullPath = path.join(imagesDir, folder);
        return fs.statSync(fullPath).isDirectory();
    });

    const paths = [];

    themes.forEach((theme) => {
        const themeDir = path.join(imagesDir, theme);
        const formats = fs.readdirSync(themeDir).filter((sub) =>
            fs.statSync(path.join(themeDir, sub)).isDirectory()
        );

        formats.forEach((format) => {
            const formatDir = path.join(themeDir, format);
            const files = fs.readdirSync(formatDir).filter((file) =>
                /\.(jpe?g|png|webp|gif|bmp|svg|avif|tiff?|mp4|mov|webm)$/i.test(file)
            );
            files.forEach((filename) => {
                paths.push({
                    params: { theme, image: filename },
                });
            });
        });
    });

    return {
        paths: [], // on ne pré-génère rien
        fallback: 'blocking', // la page est générée au premier accès
    };
}

export async function getStaticProps({ params }) {
    const { theme, image } = params;
    const imagesDir = path.join(process.cwd(), 'public/images', theme);

    const formats = fs
        .readdirSync(imagesDir)
        .filter((f) => fs.statSync(path.join(imagesDir, f)).isDirectory());

    let foundFormat = null;

    for (const format of formats) {
        const filePath = path.join(imagesDir, format, image);
        if (fs.existsSync(filePath)) {
            foundFormat = format;
            break;
        }
    }

    if (!foundFormat) {
        return { notFound: true };
    }

    const descPath = path.join(process.cwd(), 'public/data/descriptions.json');
    let descriptions = {};

    try {
        const fileContent = fs.readFileSync(descPath, 'utf-8');
        descriptions = JSON.parse(fileContent);
    } catch (err) {
        console.error('Erreur descriptions.json :', err);
    }

    const themeData = descriptions[theme]?.[foundFormat] || {};
    const imageData = themeData[image] || {};

    return {
        props: {
            theme,
            format: foundFormat,
            image,
            title: imageData.title || image,
            description: imageData.description || '',
        },
    };
}

export default function ImageDetail({ theme, format, image, title, description }) {
    return (
        <div className="max-w-6xl mx-auto py-8 px-6 md:px-10 text-white glass-section gap-10">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">{title}</h1>

            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-5">
                <div className="w-full md:w-1/2 flex justify-end pr-6">
                    <div className="relative w-[410px] h-[410px]">
                        <Zoom>
                            <Image
                                src={`/images/${theme}/${format}/${image}`}
                                alt={title}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg shadow-lg"
                            />
                        </Zoom>
                    </div>
                </div>

                <div className="w-full md:w-[30%] flex items-center justify-start">
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light whitespace-pre-line opacity-90 italic tracking-wide max-w-md">
                        {description || 'Aucune description disponible.'}
                    </p>
                </div>
            </div>

            <div className="mt-10 text-center">
                <Link href="/gallery">
                    <button className="px-4 py-2 bg-accent text-white rounded hover:bg-opacity-80 neon-glow text-sm md:text-base">
                        ← Retour à la galerie
                    </button>
                </Link>
            </div>
        </div>
    );
}
