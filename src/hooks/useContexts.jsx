import { createContext, useContext } from "react";

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);
