// context/PageTransitionContext.js
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";

const PageTransitionContext = createContext();

export function PageTransitionProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [direction, setDirection] = useState("forward");
  const router = useRouter();

  // À chaque navigation, on met à jour l’historique et la direction
  const updateHistory = (url) => {
    setHistory((prev) => {
      const index = prev.indexOf(url);
      if (index === -1) {
        // Nouvelle page : forward
        setDirection("forward");
        return [...prev, url];
      } else {
        // Page déjà visitée : backward
        setDirection("backward");
        return prev.slice(0, index + 1);
      }
    });
  };

  return (
    <PageTransitionContext.Provider value={{ direction, updateHistory }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(PageTransitionContext);
}
