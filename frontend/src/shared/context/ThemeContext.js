import { useState, createContext } from 'react';

const ThemeContext = createContext();

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => (theme === "dark") ? setTheme("light") : setTheme("dark");

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
