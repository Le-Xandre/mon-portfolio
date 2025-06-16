// pages/gallery/[theme]/[image].js
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { getAssetPath } from '../../../lib/assets';

export async function getStaticPaths() {
    const imagesDir = path.join(process.cwd(), 'public/images');
    const themes = fs.readdirSync(imagesDir).filter((folder) => fs.statSync(path.join(imagesDir, folder)).isDirectory());

    const paths = [];

    themes.forEach((theme) => {
        const themeDir = path.join(imagesDir, theme);
        const files = fs.readdirSync(themeDir).filter((file) => /\.(jpe?g|png|webp)$/i.test(file));
        files.forEach((filename) => {
            paths.push({
                params: { theme, image: filename }
            });
        });
    });

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const { theme, image } = params;

    const descPath = path.join(process.cwd(), 'public/data/descriptions.json');
    let descriptions = {};

    if (fs.existsSync(descPath)) {
        const raw = fs.readFileSync(descPath);
        descriptions = JSON.parse(raw);
    }

    const description = descriptions[theme]?.[image] || null;

    return {
        props: {
            theme,
            image,
            description
        }
    };
}

export default function ImageDetail({ theme, image, description }) {
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 text-center">
            <h1 className="text-2xl font-bold text-white mb-6">{image}</h1>
            <div className="relative w-full h-[500px] mx-auto">
                <Image
                    src={getAssetPath(`/images/${theme}/${image}`)}
                    alt={image}
                    layout="fill"
                    objectFit="contain"
                    className="rounded shadow-lg"
                />
            </div>
            <p className="mt-6 text-lg text-gray-300">
                {description || 'Aucune description personnalisée pour cette image.'}
            </p>
        </div>
    );
}
