// pages/playlists.js
import React, { useState } from 'react'
import styles from '../styles/Playlists.module.css'

// Métadonnées locales pour classification et titres personnalisés
const playlistMeta = {
    "PL7XN2x8uRCXcuI-lc75b1wCvqkgGJUwbB": {
        title: "♫ ☯―' (.X.x.X.) Music Playlist ~ FullDrive ~ '―☯ ♪",
        description: "Entre nouvelles sorties & nostalgies, Différents styles musicaux ♫",
        category: "Musique"
    },
    "PL7XN2x8uRCXeZpKhRT3aDS58A2UMDVOyI": {
        title: "Mes petites Créations numériques ♫",
        description: "Divers petites créations variées.",
        category: "Créations"
    },
    "PL7XN2x8uRCXc8YqC0MgAw1Wi51hOR4nvr": {
        title: "☯―'~ Divers d'univers tout en vers/verre/vert ..° ~'―☯",
        description: "Divers documentaires",
        category: "Documentaires"
    },
    "PL7XN2x8uRCXfcnbbTTrsow6-FfUQCkxPb": {
        title: "Les mythes vikings",
        description: "Série documentaires sur les mythes & légendes vikings",
        category: "Documentaires"
    },
    "PL7XN2x8uRCXd0ggnyVR32xh5VzD4U8s6-": {
        title: "Myth of Man - Ost ♫",
        description: "Bande originale du film Myth of Man.",
        category: "Musique"
    },
    "PL7XN2x8uRCXcx2QGHZr0qHCJOaHk1xPNn": {
        title: "Severance (TV + OST)",
        description: "Bandes annonces et extraits de la série Severance.",
        category: "Musique"
    },
    "PL7XN2x8uRCXcf0rk0I--KTRJ9sm0RTik5": {
        title: "♥ Playlist Friendly - Arcane / 02 ♪ OST ♫",
        description: "Bande originale de la saison 02 de la série animé Arcane.",
        category: "Musique"
    },
    "PL7XN2x8uRCXeZD9dnkJcxzSjkoRQubcMs": {
        title: "Musique type radio - Lofi / Lounge",
        description: "Playlist Lofi Music.",
        category: "Musique"
    },
    "PL7XN2x8uRCXfOtqOurrA6XGoFB3x-uD5m": {
        title: "Playlist Arte - Hellfest 2024",
        description: "Revivez l'édition 2024 du festival.",
        category: "Musique"
    },
    "PL7XN2x8uRCXc3KNeYX6t0if5fEJe4GJ6P": {
        title: "Playlist Arte - Hellfest 2025",
        description: "Morceaux chill, électro et ambient pour se concentrer ou rêver.",
        category: "Musique"
    },
    "PL7XN2x8uRCXfUWD6vq74l8nM214CPxmK0": {
        title: "Miniatures Painting / Necromunda Mix",
        description: "Ambiance Warhammer Necromunda & créations.",
        category: "Autres"
    },
    "PL7XN2x8uRCXeEFBClUHH3oE9GoInEmnO3": {
        title: "Tatami Galaxy (V.o.s.t.fr) - 四畳半神話大系 * (2010) ♥",
        description: "Anime Tatami Galaxy en VOSTFR.",
        category: "Autres"
    }
}

export default function PlaylistsPage() {
    const tabs = ["Créations", "Documentaires", "Musique", "Autres", "Tout"]
    const [activeTab, setActiveTab] = useState("Créations")

    // Construire la liste à partir des métadonnées
    const enriched = Object.entries(playlistMeta).map(([id, meta]) => ({
        id,
        title: meta.title,
        description: meta.description,
        category: meta.category
    }))

    // Filtrer selon onglet
    const filtered = activeTab === "Tout"
        ? enriched
        : enriched.filter(pl => pl.category === activeTab)

    return (
        <main className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-gray-900">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
                Mes Playlists YouTube
            </h1>

            {/* Onglets */}
            <div className={styles.tabs}>
                {tabs.map(tab => (
                    <button
                        key={tab}
                        className={`${styles.tab} ${activeTab === tab ? styles['tab-active'] : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Grille des cartes */}
            <div className={styles.cardGrid}>
                {filtered.map(pl => (
                    <div key={pl.id} className={styles.card}>
                        <div className={styles.videoWrapper}>
                            <iframe
                                width="100%"
                                height="240"
                                src={`https://www.youtube.com/embed/videoseries?list=${pl.id}&rel=0&modestbranding=1`}
                                title={pl.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className={styles.details}>
                            <h2 className={styles.title}>{pl.title}</h2>
                            <p className={styles.description}>{pl.description}</p>
                            <div className={styles.actions}>
                                <a
                                    href={`https://www.youtube.com/playlist?list=${pl.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.button}
                                >
                                    🌀 Lecture aléatoire sur YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
