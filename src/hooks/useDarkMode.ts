import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useDarkMode = (): {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
} => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = Cookies.get("theme");
    return savedMode ? savedMode === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleDarkMode = (): void => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    Cookies.set("theme", newMode ? "dark" : "light", { expires: 365 });

    setTimeout(() => {
      window.location.reload();
    }, 100); 
  };

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark");
      body.classList.remove("light");
    } else {
      body.classList.add("light");
      body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode };
};
