import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Switch } from "@headlessui/react";

export default function Settings() {
  const { user, isSignedIn } = useUser();
  const [darkMode, setDarkMode] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Load the saved theme on first render
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    const isDark = storedTheme === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // Toggle theme without saving immediately
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    setUnsavedChanges(true);
  };

  // Save theme preference only when clicking "Save Changes"
  const saveChanges = () => {
    const newTheme = darkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", darkMode);
    setUnsavedChanges(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-16 bg-[var(--secondary-bg)] text-[var(--text-color)] rounded-xl shadow-lg transition-all">
      <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>

      {isSignedIn && (
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.imageUrl}
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-[var(--accent-color)]"
          />

          <div>
            <p className="text-lg font-semibold">
              {user.fullName || "No Name Set"}
            </p>
            <p className="text-sm text-gray-400">{user.primaryEmailAddress}</p>
          </div>
        </div>
      )}

      {/* Email Settings - Show Only If Signed In */}
      {isSignedIn && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={user.primaryEmailAddress}
            disabled
            className="input mt-2 w-full bg-gray-800 text-gray-500 cursor-not-allowed"
          />
        </div>
      )}

      {/* Theme Toggle */}
      <div className="flex justify-between items-center p-4 rounded-lg transition">
        <span className="text-lg font-semibold">Dark Mode</span>
        <Switch
          checked={darkMode}
          onChange={toggleTheme}
          className={`relative inline-flex items-center h-7 w-14 rounded-full transition-colors duration-300 cursor-pointer ${
            darkMode ? "bg-[var(--accent-color)]" : "bg-[var(--secondary-bg)]"
          }`}
        >
          <span
            className={`inline-block w-5 h-5 transform bg-[var(--primary-bg)] rounded-full transition-transform ${
              darkMode ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </Switch>
      </div>

      {/* Save Button - Only Show When Changes Are Unsaved */}

      <button
        onClick={saveChanges}
        className="button w-full mt-6 py-3 text-lg font-semibold"
      >
        Save Changes
      </button>
    </div>
  );
}
