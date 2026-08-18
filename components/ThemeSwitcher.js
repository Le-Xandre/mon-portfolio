// components/ThemeSwitcher.js

import { FiSun, FiMoon, FiSettings } from 'react-icons/fi';
import { GiFairyWand } from 'react-icons/gi';
import { useTheme } from '../context/ThemeContext';

const themeConfig = {
    light: {
        icon: <FiMoon size={20} />,
        label: 'Passer au thème sombre',
        title: 'Thème sombre',
        className: 'text-gray-800',
    },

    dark: {
        icon: <FiSun size={20} />,
        label: 'Passer au thème steampunk',
        title: 'Thème steampunk',
        className: 'text-yellow-400',
    },

    steampunk: {
        icon: <FiSettings size={20} />,
        label: 'Passer au thème cyberpunk',
        title: 'Thème cyberpunk',
        className: 'text-amber-500',
    },

    cyberpunk: {
        icon: <GiFairyWand size={20} />,
        label: 'Passer au thème fantasy',
        title: 'Thème fantasy',
        className: 'text-cyan-400',
    },

    fantasy: {
        icon: <GiFairyWand size={20} />,
        label: 'Revenir au thème clair',
        title: 'Thème clair',
        className: 'text-purple-400',
    },
};

export default function ThemeSwitcher() {
    const { theme, cycleTheme } = useTheme();

    const currentTheme = themeConfig[theme] || themeConfig.light;

    return (
        <button
            type="button"
            onClick={cycleTheme}
            className={`
                flex items-center justify-center
                p-2 rounded-full
                transition-all duration-300
                hover:bg-gray-200/70
                dark:hover:bg-gray-700/70
                hover:scale-110
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-cyan-400
                ${currentTheme.className}
            `}
            aria-label={currentTheme.label}
            title={currentTheme.title}
        >
            <span
                className="flex items-center justify-center transition-transform duration-300"
                aria-hidden="true"
            >
                {currentTheme.icon}
            </span>
        </button>
    );
}
