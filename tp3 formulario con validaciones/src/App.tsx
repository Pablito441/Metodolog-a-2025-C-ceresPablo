import { useEffect, useState } from "react";
import "./index.css";
import "./app.css";
import { Form } from "./components/Form/Form";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div>
      <nav className="header">
        <div className="header-content">
          <div className="header-spacer" />
          <h1 className="header-title">Formulario con validaciones</h1>
          <button className="theme-toggle-button" onClick={toggleTheme}>
            <span className="material-symbols-outlined">
              {isDarkMode ? "brightness_7" : "brightness_4"}
            </span>
          </button>
        </div>
      </nav>
      <Form></Form>
    </div>
  );
}

export default App;
