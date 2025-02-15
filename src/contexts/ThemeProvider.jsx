/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../hooks/useContexts";

export const ThemeProvider = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState(
    () => window.matchMedia("(prefers-color-scheme: light)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = (e) => setIsLightMode(e.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const themeValues = useMemo(
    () => ({
      isLightMode,
      bgClass: "bg-theme",
      textClass: "text-theme",
    }),
    [isLightMode],
  );

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
};
