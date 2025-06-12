// components/Navbar.js

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeSwitcher from './ThemeSwitcher';
import Image from 'next/image';

export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false);

    const navLinks = [
        { href: '/about', label: 'À propos' },
        { href: '/projects', label: 'Projets' },
        { href: '/gallery', label: 'Galerie' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' },
    ];

    const linkClasses =
        'py-4 px-2 text-gray-500 hover:text-primary transition-colors duration-300 cursor-pointer';

    return (
        <nav className="bg-white/30 backdrop-blur-md dark:bg-gray-800/30 shadow-md transition-colors duration-300">

            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    {/* Logo */}
                    <div className="flex space-x-7">
                        <Link href="/" passHref>
                            <span className="flex items-center py-4 px-2 font-extrabold text-center neon-glow font-bold text-xl cursor-pointer">
                                Portfolio 
                            </span>
                        </Link>
                    </div>

                    {/* Menu desktop */}
                    <div className="hidden md:flex items-center space-x-3">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className={linkClasses}>
                                {link.label}
                            </Link>
                        ))}
                        <div className="py-4 px-2 hover:scale-105 transition-transform duration-300">
                            <ThemeSwitcher />
                        </div>
                    </div>

                    {/* Hamburger button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setNavOpen(!navOpen)}>
                            {navOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu mobile */}
            {navOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="block py-2 px-4 text-gray-500 hover:text-primary transition-colors duration-300">
                            {link.label}
                        </Link>
                    ))}
                    <div className="py-2 px-4 hover:scale-105 transition-transform duration-300">
                        <ThemeSwitcher />
                    </div>
                </div>
            )}
        </nav>
    );
}

