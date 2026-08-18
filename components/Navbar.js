// components/Navbar.js

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false);

    const navLinks = [
        { href: '/about', label: 'À propos' },
        { href: '/projects', label: 'Projets' },
        { href: '/gallery', label: 'Galerie' },
        { href: '/blog', label: 'Blog' },
        { href: '/playlists', label: 'playlists' },
        { href: '/contact', label: 'Contact' },
    ];

    const linkClasses = `
        inline-flex items-center justify-center
        min-h-[44px]
        px-2 py-2
        text-[var(--text-main)]
        text-sm font-medium
        tracking-[0.01em]
        leading-tight
        whitespace-nowrap
        no-underline
        transition-all duration-300
        hover:text-[var(--link-hover)]
        hover:[text-shadow:0_0_8px_rgba(0,255,255,0.45)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--link)]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-transparent
    `;

    const closeMenu = () => {
        setNavOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex min-h-[60px] items-center justify-between">

                    {/* Logo + Theme Switcher */}
                    <div className="flex items-center gap-2">
                        <Link
                            href="/"
                            className="
                                flex items-center
                                px-2 py-2
                                text-xl font-extrabold
                                neon-glow
                                cursor-pointer
                                transition-transform duration-300
                                hover:scale-[1.02]
                            "
                        >
                            Portfolio
                        </Link>

                        <div className="px-1">
                            <ThemeSwitcher />
                        </div>
                    </div>

                    {/* Navigation desktop */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={linkClasses}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Bouton menu mobile */}
                    <button
                        type="button"
                        onClick={() => setNavOpen((previous) => !previous)}
                        className="
                            flex md:hidden
                            items-center justify-center
                            min-h-[44px] min-w-[44px]
                            rounded-lg
                            text-[var(--text-main)]
                            transition-all duration-300
                            hover:bg-white/10
                            hover:text-[var(--link-hover)]
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-[var(--link)]
                        "
                        aria-label={
                            navOpen
                                ? 'Fermer le menu'
                                : 'Ouvrir le menu'
                        }
                        aria-expanded={navOpen}
                        aria-controls="mobile-navigation"
                    >
                        {navOpen ? (
                            <FiX size={24} aria-hidden="true" />
                        ) : (
                            <FiMenu size={24} aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {/* Navigation mobile */}
            {navOpen && (
                <div
                    id="mobile-navigation"
                    className="
                        md:hidden
                        border-t border-[var(--border-soft)]
                        bg-[var(--nav-backdrop)]
                        backdrop-blur-md
                    "
                >
                    <div className="max-w-4xl mx-auto px-4 py-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`
                                    flex items-center
                                    min-h-[44px]
                                    px-3 py-2
                                    text-[var(--text-main)]
                                    text-sm font-medium
                                    no-underline
                                    rounded-lg
                                    transition-all duration-300
                                    hover:bg-white/5
                                    hover:text-[var(--link-hover)]
                                `}
                                onClick={closeMenu}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
