"use client";
import Link from "next/link";
import { FiHome, FiBarChart2, FiSettings, FiX } from "react-icons/fi";

export default function SidebarSm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Sidebar Container */}
      <div
        className={`fixed inset-0 z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 h-full w-[80vw] max-w-[300px] bg-[var(--sec-bg-op)] shadow-lg p-4">

          {/* Sidebar Navigation */}
          <nav className="mt-16 flex flex-col">
            <ul className="space-y-4 text-white text-lg">
              <SidebarItem href="/" icon={<FiHome size={22} />} text="Home" />
              <SidebarItem href="/dashboard" icon={<FiBarChart2 size={22} />} text="Dashboard" />
              <SidebarItem href="/settings" icon={<FiSettings size={22} />} text="Settings" />
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}

function SidebarItem({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center px-6 py-4 hover:bg-[var(--secondary-bg)] rounded transition-all"
      >
        <div className="w-8 flex justify-center">{icon}</div>
        <span className="ml-3">{text}</span>
      </Link>
    </li>
  );
}
