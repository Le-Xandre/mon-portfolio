// File: pages/_app.js
import React, { useEffect } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { PageTransitionProvider, usePageTransition } from "../context/PageTransitionContext";
import useGlow from "../components/glow";
import { getAssetPath } from "../lib/assets";

function PageTransitionWrapper({ children }) {
    const router = useRouter();
    const { direction, updateHistory } = usePageTransition();

    useEffect(() => {
        updateHistory(router.pathname);
    }, [router.pathname]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={router.pathname}
                initial={{ opacity: 0, x: direction === "forward" ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === "forward" ? -50 : 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative w-full min-h-cover"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

export default function App({ Component, pageProps }) {
    useGlow();

    return (
        <ThemeProvider>
            {/* Global background fixed */}
            <div
                className="background fixed inset-0 -z-20 pointer-events-none"
                style={{
                    backgroundImage: `url('${getAssetPath("/images/bg02.png")}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div
                    className="noise-overlay"
                    style={{
                        backgroundImage: `url('${getAssetPath("/images/noise 01.png")}')`,
                        opacity: 0.2,
                        backgroundSize: "cover",
                        mixBlendMode: "screen",
                    }}
                />
            </div>

            <PageTransitionProvider>
                <Layout>
                    <PageTransitionWrapper>
                        <Component {...pageProps} />
                    </PageTransitionWrapper>
                </Layout>
            </PageTransitionProvider>
        </ThemeProvider>
    );
}