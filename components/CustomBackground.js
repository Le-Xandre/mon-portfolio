// File: components/CustomBackground.js
import { getAssetPath } from "../lib/assets";

export default function CustomBackground() {
    return (
        <div
            className="absolute inset-0 neon-glow avatar-halo -z-10 rounded-2xl bg-cover bg-center"
            style={{
                backgroundImage: `url('${getAssetPath("/images/bg02.png")}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                opacity: 0.5,
                backgroundColor: "#000",
                backgroundBlendMode: "overlay",
                
            }}
        >
            <div className="absolute rounded-2xl neon-glow avatar-halo inset-0 bg-black opacity-50 " />
            {/* Noise overlay removed to stabilize layout */}
        </div>
    );
}
