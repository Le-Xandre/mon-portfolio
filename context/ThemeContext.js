import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const themes = ['light', 'dark', 'steampunk', 'cyberpunk', 'fantasy'];

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState('light');

    /**
     * Applique le thème au document.
     *
     * persist = true :
     * le choix est mémorisé dans localStorage.
     *
     * persist = false :
     * le thème est seulement appliqué temporairement,
     * notamment lorsqu'il vient de la préférence système.
     */
    const applyTheme = (newTheme, persist = true) => {
        setThemeState(newTheme);

        document.documentElement.setAttribute('data-theme', newTheme);

        document.documentElement.classList.toggle(
            'dark',
            newTheme === 'dark'
        );

        if (persist) {
            localStorage.setItem('theme', newTheme);
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );

        // Si l'utilisateur a déjà choisi un thème,
        // on conserve son choix.
        //
        // Sinon, on respecte la préférence du système.
        const initialTheme =
            savedTheme ||
            (prefersDark.matches ? 'dark' : 'light');

        applyTheme(initialTheme, Boolean(savedTheme));

        // Réagit aux changements de préférence système
        // uniquement lorsqu'aucun choix utilisateur n'est enregistré.
        const handleSystemThemeChange = (event) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(
                    event.matches ? 'dark' : 'light',
                    false
                );
            }
        };

        prefersDark.addEventListener(
            'change',
            handleSystemThemeChange
        );

        return () => {
            prefersDark.removeEventListener(
                'change',
                handleSystemThemeChange
            );
        };
    }, []);

    const cycleTheme = () => {
        const currentIndex = themes.indexOf(theme);
        const nextTheme =
            themes[(currentIndex + 1) % themes.length];

        applyTheme(nextTheme, true);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme: (newTheme) => applyTheme(newTheme, true),
                cycleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
