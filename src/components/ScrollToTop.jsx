import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Minden útvonalváltásnál (pathname változás) a tetejére ugrik
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Nem jelenít meg semmit, csak a háttérben dolgozik
};

export default ScrollToTop;