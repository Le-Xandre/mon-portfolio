// context/ThemeContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const themes = ['light', 'dark', 'steampunk', 'cyberpunk', 'fantasy'];

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        const initialTheme = saved || (prefersDark.matches ? 'dark' : 'light');
        applyTheme(initialTheme);

        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });

        return () => {
            prefersDark.removeEventListener('change', () => { });
        };
    }, []);

    const applyTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);

        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const cycleTheme = () => {
        const currentIndex = themes.indexOf(theme);
        const next = themes[(currentIndex + 1) % themes.length];
        applyTheme(next);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: applyTheme, cycleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
