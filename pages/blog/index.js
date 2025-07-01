// pages/blog/index.js

import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';
import TornImage from '../../components/TornImage';
import { useState } from 'react';
import IainJournalModal from '../../components/IainJournalModal';
import IainJournalButton from '../../components/IainJournalButton';

export async function getStaticProps() {
    const files = fs.readdirSync(path.join('content/blog'));
    const posts = files.map((filename) => {
        const markdownWithMeta = fs.readFileSync(path.join('content/blog', filename), 'utf-8');
        const { data } = matter(markdownWithMeta);
        return {
            frontmatter: data,
            slug: filename.replace('.md', ''),
        };
    });
    return { props: { posts } };
}

export default function Blog({ posts }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="glass-section py-8  max-w-6xl mx-auto my-8 dark:bg-gray-800">
<h2 className="neon-glow text-gray-900 dark:text-white text-xl md:text-4xl text-center font-semibold mb-4 text-lime-200">
                    Blog
                </h2>
            {/* En-tête avec titre et bouton alignés */}
            <div className="flex justify-between items-center px-8 mb-6">
                
                <IainJournalButton onClick={() => setIsModalOpen(true)} />
            </div>

            {/* Fond de section */}
            <div className="fixed inset-2 bg-black/10 pointer-events-none" />

            {/* Modal J.D.B. */}
            <IainJournalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Swiper (slider) des articles + option span Page ${idx + 1} */}
            <div className="relative z-10 flex-grow">
                <div className="mx-auto max-w-12xl text-center items-center">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{
                            clickable: true,
                            renderBullet: (idx, className) =>
                                `<span class="${className}"></span>`,
                        }} 
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            1280: { slidesPerView: 2 },
                            2048: { slidesPerView: 3 },
                        }}
                    >
                        {posts.map((post, index) => (
                            <SwiperSlide key={index}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="block bg-white dark:bg-gray-700 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                                >
                                    <TornImage
                                        src={post.frontmatter.coverImage || '/default.jpg'}
                                        alt={post.frontmatter.title}
                                        className="h-40"
                                    />
                                    <div className="py-8 px-4 max-w-8xl min-h-[240px] flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                                                {post.frontmatter.title}
                                            </h3>
                                            <p className="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-300">
                                                {post.frontmatter.description}
                                            </p>
                                        </div>
                                        <p className="mt-4 text-gray-500 dark:text-gray-400 text-center">
                                            <em>{post.frontmatter.date}</em>
                                        </p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
         
        </section>
    );
}
