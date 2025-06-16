// components/ThemeSwitcher.js
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { GiFairyWand } from 'react-icons/gi'; // ✨ pour le thème fantasy

export default function ThemeSwitcher() {
    const { theme, cycleTheme } = useTheme();

    const icon = {
        light: <FiMoon size={20} className="text-gray-800" />,
        dark: <FiSun size={20} className="text-yellow-400" />,
        steampunk: <GiFairyWand size={20} className="text-amber-600" />,
        cyberpunk: <GiFairyWand size={20} className="text-cyan-400" />,
        fantasy: <GiFairyWand size={20} className="text-purple-400" />
    }[theme];

    return (
        <button
            onClick={cycleTheme}
            className="flex items-center p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Cycle Theme"
        >
            {icon}
        </button>
    );
}
