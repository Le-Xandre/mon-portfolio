import Navbar from './Navbar';
import Footer from './Footer';
import { AnimatePresence, motion } from 'framer-motion';

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">      {/* 1. conteneur flex-col  */}
            <Navbar />
            <main className="flex-grow m-4">                    {/* 2. main prend l’espace restant */}
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />                                      {/* 3. Footer collé en bas */}
        </div>
    );
}
