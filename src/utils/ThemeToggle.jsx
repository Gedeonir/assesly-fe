import { useState, useEffect } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (dark) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
    >
      Toggle Dark Mode
    </button>
  );
}

export default ThemeToggle;
