import React, { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const folderNames = fs.readdirSync(imagesDir).filter(name => {
        return fs.statSync(path.join(imagesDir, name)).isDirectory();
    });

    const folders = folderNames.map(folder => {
        const folderPath = path.join(imagesDir, folder);
        const files = fs.readdirSync(folderPath).filter(file =>
            /\.(jpe?g|png|gif|webp)$/i.test(file)
        );
        // Return full public path URLs
        const images = files.map(file => `/images/${folder}/${file}`);
        return {
            name: folder,
            images,
        };
    });

    return { props: { folders } };
}

export default function Gallery({ folders }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentFolderIndex, setCurrentFolderIndex] = useState(0);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    // Autoplay logic: change image every 3s if autoplay enabled
    useEffect(() => {
        if (!autoplay || !lightboxOpen) return;
        const timer = setInterval(() => {
            const currentFolder = folders[currentFolderIndex];
            setPhotoIndex((prevIndex) => (prevIndex + 1) % currentFolder.images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [autoplay, lightboxOpen, currentFolderIndex, folders]);

    const openLightbox = (folderIdx, imgIdx) => {
        setCurrentFolderIndex(folderIdx);
        setPhotoIndex(imgIdx);
        setLightboxOpen(true);
    };

    const currentFolder = folders[currentFolderIndex];

    return (
        <div>
            {folders.map((folder, folderIdx) => (
                <section key={folder.name} className="gallery-folder">
                    <h2 className="gallery-folder-title">{folder.name}</h2>
                    <div className="gallery-container">
                        {folder.images.map((src, imgIdx) => (
                            <div
                                key={src}
                                className="gallery-card"
                                onClick={() => openLightbox(folderIdx, imgIdx)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') openLightbox(folderIdx, imgIdx);
                                }}
                            >
                                <img src={src} alt={`${folder.name} image ${imgIdx + 1}`} />
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            {lightboxOpen && (
                <Lightbox
                    mainSrc={currentFolder.images[photoIndex]}
                    nextSrc={currentFolder.images[(photoIndex + 1) % currentFolder.images.length]}
                    prevSrc={currentFolder.images[(photoIndex + currentFolder.images.length - 1) % currentFolder.images.length]}
                    onCloseRequest={() => setLightboxOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + currentFolder.images.length - 1) % currentFolder.images.length)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % currentFolder.images.length)
                    }
                    toolbarButtons={[
                        <button
                            key="autoplay"
                            onClick={() => setAutoplay(!autoplay)}
                            style={{
                                background: 'rgba(20, 20, 20, 0.7)',
                                color: '#0ff0fc',
                                border: '1px solid #0ff0fc',
                                borderRadius: '8px',
                                padding: '6px 10px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                marginLeft: '10px',
                            }}
                        >
                            {autoplay ? 'Stop Slideshow' : 'Start Slideshow'}
                        </button>,
                    ]}
                />
            )}
        </div>
    );
}