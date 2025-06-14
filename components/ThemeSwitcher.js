// components/ThemeSwitcher.js
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <FiMoon size={20} className="text-gray-800" />
            ) : (
                <FiSun size={20} className="text-yellow-400" />
            )}
        </button>
    );
}
