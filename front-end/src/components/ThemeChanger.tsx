import { useTheme } from "../contexts/ThemeContext";
import "../sass/ThemeChanger/ThemeChanger.scss";
import { useEffect } from "react";

const ThemeChanger = () => {
  const { currentTheme, changeTheme } = useTheme();

  useEffect(() => {
    document.documentElement.style.setProperty("--theme-color", currentTheme);
  }, [currentTheme]);

  return (
    <button
      className="theme-changer-button"
      type="button"
      onClick={changeTheme}
      title="Change theme color"
      style={{ backgroundColor: "var(--theme-color)" }}
    >
      <i className="bi bi-palette"></i>
    </button>
  );
};

export default ThemeChanger;
