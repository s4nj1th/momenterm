import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Switch } from "@headlessui/react";

export default function Settings() {
  const { user, isSignedIn } = useUser();
  const [darkMode, setDarkMode] = useState(false);

  // Load the saved theme on first render
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setDarkMode(storedTheme === "dark");

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-16 bg-[var(--secondary-bg)] text-[var(--text-color)] rounded-xl shadow-lg transition-all">
      <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>

      {/* Theme Toggle */}
      <div className="flex justify-between items-center p-4 rounded-lg transition">
        <span className="text-lg font-semibold">Dark Mode</span>
        <Switch
          checked={darkMode}
          onChange={toggleTheme}
          className={`relative inline-flex items-center h-7 w-14 rounded-full transition-colors duration-300 cursor-pointer ${
            darkMode ? "bg-[var(--accent-color)]" : "bg-gray-600"
          }`}
        >
          <span
            className={`inline-block w-5 h-5 transform bg-[var(--primary-bg)] rounded-full transition-transform ${
              darkMode ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </Switch>
      </div>

      {/* Save Button */}
      <button className="button w-full mt-6 py-3 text-lg font-semibold">Save Changes</button>
    </div>
  );
}
