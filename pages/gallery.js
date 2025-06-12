import { useState } from 'react';
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
import { getAssetPath } from '../lib/assets'; // ✅ ajout

export async function getStaticProps() {
    const imageDir = path.join(process.cwd(), 'public/images');
    const themes = fs
        .readdirSync(imageDir)
        .filter((name) => fs.statSync(path.join(imageDir, name)).isDirectory());

    const galleries = themes.map((theme) => {
        const themeFolder = path.join(imageDir, theme);
        const files = fs
            .readdirSync(themeFolder)
            .filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file));

        const images = files.map((filename) =>
            getAssetPath(`/images/${theme}/${encodeURIComponent(filename)}`)
        );
        return { theme, images };
    });

    return {
        props: { galleries },
    };
}

export default function Gallery({ galleries }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImages, setCurrentImages] = useState([]);

    const openLightbox = (images, index) => {
        setCurrentImages(images.map((src) => ({ src })));
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    return (
        <section className="py-10 max-w-6xl mx-auto dark:bg-gray-800">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto px-4"
            >
                <h2 className="text-4xl font-extrabold text-center neon-glow text-gray-900 dark:text-white">
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
                            navigation={true}
                            modules={[Navigation, Autoplay]}
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            className="mySwiper"
                            slidesPerView={1}
                            spaceBetween={10}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                        >
                            {gallery.images.map((src, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="flex justify-center items-center group gallery-hover-area cursor-none"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05, rotate: 1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative w-60 h-60 overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                                        onClick={() => openLightbox(gallery.images, index)}
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
                                        />
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                ))}
            </motion.div>

            {lightboxOpen && (
                <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)}
                    slides={currentImages}
                    index={currentIndex}
                    plugins={[Fullscreen, Zoom, Slideshow]}
                />
            )}

            <CustomCursor />
        </section>
    );
}
