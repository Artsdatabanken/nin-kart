import { useContext, useEffect } from "react";
import { SettingsContext } from "./SettingsContext";

// Slå på menyen når skjermbredden overstiger 768px
const ResponsivtVindu = ({ children }) => {
  const settings = useContext(SettingsContext);
  useEffect(() => {
    const handleResize = ({ target: { innerWidth } }) => {
      if (innerWidth >= 768) settings.onNavigateToTab("meny");
      settings.onSetWidth(innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return children;
};

export default ResponsivtVindu;
