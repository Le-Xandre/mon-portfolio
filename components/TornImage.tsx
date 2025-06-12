type TornImageProps = {
    src: string;
    alt?: string;
    className?: string;
};

export default function TornImage({ src, alt, className }: TornImageProps) {
    return (
        <div className={`relative overflow-hidden max-h-48 ${className}`}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
            />
            <svg
                className="absolute top-0 left-0 w-full h-12"
                viewBox="0 0 500 150"
                preserveAspectRatio="none"
            >
                <defs>
                    <mask id="tornMask">
                        <rect width="100%" height="100%" fill="white" />
                        <path
                            d="M0,0 C150,100 350,0 500,100 L500,00 L0,0 Z"
                            fill="black"
                        />
                    </mask>
                </defs>
                <rect width="100%" height="100%" fill="white" mask="url(#tornMask)" />
            </svg>
        </div>
    );
}
