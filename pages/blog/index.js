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
        <section className="glass-section py-8 max-w-6xl mx-auto my-4 mx-auto dark:bg-gray-800">

            <div className="fixed inset-0 bg-black/10 pointer-events-none" />

            {/* Conteneur centré pour le titre et le slider */}
            <div className="flex justify-end pr-8">
                <IainJournalButton onClick={() => setIsModalOpen(true)} />
            </div>

            <IainJournalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
 
            {/* Slider */}
            <div className="relative z-10 flex-grow">
                <div className="mx-auto max-w-12xl text-center items-center">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{
                            clickable: true,
                            renderBullet: (idx, className) =>
                                `<span class="${className}">Page ${idx + 1}</span>`,
                        }}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
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
                                        className="h-42"
                                    />
                                    <div className="py-8 max-w-8xl">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {post.frontmatter.title}
                                        </h3>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                                            {post.frontmatter.description}
                                        </p>
                                        <p className="mt-4 text-gray-500 dark:text-gray-400">
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