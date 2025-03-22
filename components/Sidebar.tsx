import Link from "next/link";
import { FiHome, FiBarChart2, FiSettings } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowText(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isOpen]);

  return (
    <aside
      className={`fixed left-0 top-[64px] h-[calc(100vh-64px)] shadow-lg bg-[var(--secondary-bg)] overflow-hidden transition-all duration-500 ease-in-out px-3 ${
        isOpen ? "w-16" : "w-56"
      }`}
    >
      <nav className="mt-6 flex flex-col">
        <ul className="space-y-3">
          <SidebarItem href="/" icon={<FiHome size={22} />} text="Home" showText={!showText} />
          <SidebarItem href="/dashboard" icon={<FiBarChart2 size={22} />} text="Dashboard" showText={!showText} />
          <SidebarItem href="/settings" icon={<FiSettings size={22} />} text="Settings" showText={!showText} />
        </ul>
      </nav>
    </aside>
  );
}

function SidebarItem({ href, icon, text, showText }: { href: string; icon: React.ReactNode; text: string; showText: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className="sidebar-item"
      >
        <div className="w-10 flex justify-center">{icon}</div>
        {showText && <span className="ml-2 opacity-100 transition-opacity duration-300">{text}</span>}
      </Link>
    </li>
  );
}
