import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Switch } from "@headlessui/react";

export default function Settings() {
  const { user, isSignedIn } = useUser();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check stored theme preference
    const storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  if (!isSignedIn) return <p className="text-center mt-20">Please log in to access settings.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-16 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Profile Info */}
      <div className="flex items-center gap-4 mb-6">
        <img src={user.imageUrl} alt="Profile" className="w-16 h-16 rounded-full border-2 border-[var(--accent-color)]" />
        <div>
          <p className="text-lg font-semibold">{user.fullName || "No Name Set"}</p>
          <p className="text-sm text-gray-400">{user.primaryEmailAddress}</p>
        </div>
      </div>

      {/* Email Settings */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          value={user.primaryEmailAddress}
          disabled
          className="input mt-2 w-full bg-gray-800 text-gray-500 cursor-not-allowed"
        />
      </div>

      {/* Theme Toggle */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg">Dark Mode</span>
        <Switch
          checked={darkMode}
          onChange={toggleTheme}
          className={`relative inline-flex items-center h-6 rounded-full w-11 transition ${
            darkMode ? "bg-[var(--accent-color)]" : "bg-gray-600"
          }`}
        >
          <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition ${
              darkMode ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </Switch>
      </div>

      {/* Save Settings */}
      <button className="button w-full mt-4">Save Changes</button>
    </div>
  );
}
