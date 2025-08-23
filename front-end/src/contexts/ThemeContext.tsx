import React, { createContext, useState, useContext } from "react";
import type { ThemeContextProps, ThemeProviderProps } from "../types/types";

const themeColors = [
  "#0d6efd",
  "#dc3545",
  "#28a745",
  "#ffc107",
  "#6610f2",
  "#fd7e14",
  "#20c997",
  "#e83e8c",
  "#17a2b8",
  "#6f42c1",
];

// Konteksto sukūrimas
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme has to be in ThemeProvider");
  }
  return context;
};

// Provider komponentas
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // Funkcija, keičianti temą atsitiktine tvarka
  const changeTheme = () => {
    const newIndex = Math.floor(Math.random() * themeColors.length);
    if (newIndex === currentColorIndex) {
      changeTheme();
    } else {
      setCurrentColorIndex(newIndex);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: themeColors[currentColorIndex],
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
