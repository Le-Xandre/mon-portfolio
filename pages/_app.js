import { ThemeProvider } from "../context/ThemeContext";
import "../styles/globals.css";
import '../styles/breizh.css';
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { PageTransitionProvider, usePageTransition } from "../context/PageTransitionContext";
import { getAssetPath } from "../lib/assets"; // 🔧 ajout

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
    return (
        <>
            {/* Background statique */}
            <div
                className="background fixed inset-0 -z-10"
                style={{ backgroundImage: `url('${getAssetPath('/images/bg02.png')}')`, backgroundSize: "cover" }}
            >
                {/* Grain statique */}
                <div
                    className="noise-overlay"
                    style={{
                        backgroundImage: `url('${getAssetPath('/images/noise 01.png')}')`,
                        opacity: 0.15,
                        mixBlendMode: "screen",
                    }}
                ></div>
            </div>

            <ThemeProvider>
                <PageTransitionProvider>
                    <Layout>
                        <PageTransitionWrapper>
                            <Component {...pageProps} />
                        </PageTransitionWrapper>
                    </Layout>
                </PageTransitionProvider>
            </ThemeProvider>
        </>
    );
}
