// pages/blog/index.js
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';
import TornImage from '../../components/TornImage';

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
    return (
        <section className="py-10 max-w-6xl mx-auto dark:bg-gray-800">
            {/* Vidéo de fond en fixed pour ne pas impacter le flux */}
            <video
                src="/videos/0_Futuristic_Technology_3840x2160.mov"
                autoPlay
                muted
                loop
                playsInline
                className="fixed inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="fixed inset-0 bg-black/10 pointer-events-none" />

            {/* Conteneur centré pour le titre et le slider */}
            <div className="relative z-10 flex-shrink-0 py-10">
                <h2 className="text-4xl font-extrabold text-center neon-glow text-gray-900 dark:text-white">
                    Blog
                </h2>
            </div>

            {/* Slider */}
            <div className="relative z-10 flex-grow">
                <div className="mx-auto max-w-4xl px-4">
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
                                    className="block bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                                >
                                    <TornImage
                                        src={post.frontmatter.coverImage || '/default.jpg'}
                                        alt={post.frontmatter.title}
                                        className="h-48"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
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
