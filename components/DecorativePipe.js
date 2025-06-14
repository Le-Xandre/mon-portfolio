export default function DecorativePipe({ className = '' }) {
    const { theme } = useTheme();
    return (
        <img
            src={`/themes/${theme}/pipe.svg`}   // OK : URL publique
            alt="Decorative pipe"
            className={className}
        />
    );
}