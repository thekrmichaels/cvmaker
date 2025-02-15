/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../hooks/useContexts.jsx";

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

  const theme = useMemo(() => (isLightMode ? "light" : "dark"), [isLightMode]);
  const themeStyle = useMemo(
    () =>
      theme === "light"
        ? "bg-white text-[#1f1f1f]"
        : "bg-[#131314] text-[#e3e3e3]",
    [theme],
  );

  return (
    <ThemeContext.Provider
      value={useMemo(() => ({ theme, themeStyle }), [theme, themeStyle])}
    >
      {children}
    </ThemeContext.Provider>
  );
};
