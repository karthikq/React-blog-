/** @format */

import React from "react";
import { useState } from "react";

const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const updateTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
      setTheme("light");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        updateTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
