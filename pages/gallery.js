// pages/gallery.js
// ⚠️ Assure-toi d’avoir descriptions.json dans /public/data/ et les images dans /public/images/[theme]/

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper';
import fs from 'fs';
import path from 'path';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { motion } from 'framer-motion';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Image from 'next/image';
import CustomCursor from '../components/CustomCursor';
import { getAssetPath } from '../lib/assets';
import descriptions from '../data/descriptions.json';
import Link from 'next/link';

export async function getStaticProps() {
    const imageDir = path.join(process.cwd(), 'public/images');
    const themes = fs
        .readdirSync(imageDir)
        .filter((name) => fs.statSync(path.join(imageDir, name)).isDirectory());

    const galleries = themes.map((theme) => {
        const themeFolder = path.join(imageDir, theme);

        const formats = fs
            .readdirSync(themeFolder)
            .filter((name) => fs.statSync(path.join(themeFolder, name)).isDirectory());

        let images = [];

        formats.forEach((format) => {
            const formatFolder = path.join(themeFolder, format);
            const files = fs
                .readdirSync(formatFolder)
                .filter((file) => /\.(jpe?g|png|webp|gif|mp4|mov)$/i.test(file));

            const formatImages = files.map((filename) =>
                getAssetPath(`/images/${theme}/${format}/${encodeURIComponent(filename)}`)
            );

            images = images.concat(formatImages);
        });

        return { theme, images };
    });

    return { props: { galleries } };
}
export default function Gallery({ galleries }) {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImages, setCurrentImages] = useState([]);
    const [currentTheme, setCurrentTheme] = useState('');
    const [infoOpen, setInfoOpen] = useState(false);

    const openLightbox = (images, index, theme) => {
        setCurrentImages(images.map((src) => ({ src })));
        setCurrentIndex(index);
        setCurrentTheme(theme);
        setLightboxOpen(true);
    };

    return (
        <section className="glass-section py-10 max-w-6xl mx-auto dark:bg-gray-800">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto px-4"
            >
                <h2 className="neon-glow text-gray-900 dark:text-white text-4xl text-center font-semibold mb-10 text-lime-200">
                    Galerie
                </h2>

                {galleries.map((gallery, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        viewport={{ once: true }}
                        className="mt-12"
                    >
                        <h3 className="text-2xl font-semibold mb-4 neon-glow uppercase tracking-widest">
                            {gallery.theme}
                        </h3>

                        <Swiper
                            navigation
                            modules={[Navigation, Autoplay]}
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            slidesPerView={1}
                            spaceBetween={10}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                            className="mySwiper"
                        >
                           {gallery.images.map((src, index) => {
  const imageName = src.split('/').pop(); // conserve l'extension
  const isGif = imageName.toLowerCase().endsWith('.gif');

  return (
    <SwiperSlide
      key={index}
      className="flex justify-center items-center group gallery-hover-area cursor-none"
    >
      <motion.div
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.95 }}
        className="glow-hover relative w-60 h-60 overflow-hidden rounded-xl shadow-lg cursor-pointer group"
        onClick={() => openLightbox(gallery.images, index, gallery.theme)}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-300 pointer-events-none"
          style={{
            backgroundImage: `url(${getAssetPath('/images/noise 03.png')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <Image
          src={src}
          alt={`Image ${index + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover cursor-none"
          {...(isGif ? { unoptimized: true } : {})}  // <-- ici !
        />

        <Link
          href={`/gallery/${gallery.theme}/${imageName}`}
          className="text-sm text-cyan-300 hover:underline absolute bottom-2 left-2 z-10 bg-black/50 p-1 rounded"
        >
          En savoir +
        </Link>
      </motion.div>
    </SwiperSlide>
  );
})}

                        </Swiper>
                    </motion.div>
                ))}
            </motion.div>

            {/* Lightbox */}
            {lightboxOpen && (
                <Lightbox
                    open={lightboxOpen}
                    close={() => {
                        setLightboxOpen(false);
                        setInfoOpen(false);
                    }}
                    slides={currentImages}
                    index={currentIndex}
                    plugins={[Fullscreen, Zoom, Slideshow]}
                    imageFit="contain"
                    render={{
                        slideImage: ({ image, offset }) => {
                            const filename = decodeURIComponent(
                                image.src.split('/').pop().replace(/%20/g, ' ')
                            );
                            const safeFilename = filename.replace(/\.[^/.]+$/, '');
                            const desc = descriptions?.[currentTheme]?.[safeFilename] || 'Aucune description disponible.';

                            return (
                                <div className="relative h-full w-full">
                                    <img
                                        src={image.src}
                                        className="object-contain max-h-full mx-auto"
                                        style={{ transform: `translateX(${offset * 100}%)` }}
                                    />
                                    {hasMounted && infoOpen && (
                                        <motion.div
                                            initial={{ x: '100%' }}
                                            animate={{ x: 0 }}
                                            exit={{ x: '100%' }}
                                            transition={{ type: 'tween', duration: 0.3 }}
                                            className="absolute top-0 right-0 h-full w-80 bg-black bg-opacity-90 text-gray-200 p-6 overflow-y-auto z-40 backdrop-blur"
                                        >
                                            <h2 className="text-xl font-bold mb-4">À propos</h2>
                                            <p className="text-sm leading-relaxed whitespace-pre-line">
                                                {desc}
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            );
                        },
                    }}
                />
            )}

            <CustomCursor />
        </section>
    );
}
