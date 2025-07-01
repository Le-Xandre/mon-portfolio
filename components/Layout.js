import Navbar from './Navbar';
import Footer from './Footer';
import { AnimatePresence, motion } from 'framer-motion';
import AgentWrapper from './IainAgent/AgentWrapper';


export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">      {/* 1. conteneur flex-col  */}
            <Navbar />
            <main className="flex-grow m-4">                    {/* 2. main prend l’espace restant */}
                <AnimatePresence mode="wait">
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
            <AgentWrapper  />                                  {/* 3. AgentWrapper en bas à droite */}
            <Footer />                                      {/* 4. Footer collé en bas */}
        </div>
        
    );
}
