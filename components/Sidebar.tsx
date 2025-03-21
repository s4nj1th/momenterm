import Link from "next/link";
import { FiHome, FiBarChart2, FiSettings } from "react-icons/fi";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`sidebar transition-all duration-300 shadow-lg fixed left-0 top-[64px] min-h-[calc(100vh-64px)] ${
        isOpen ? "w-50 px-2 py-2" : "w-16 px-2 py-2"
      }`}
    >
      <nav className="mt-6">
        <ul className="space-y-4">
          <li>
            <Link href="/" className="sidebar-item">
              <FiHome size={22} /> <span className={`${isOpen ? "block" : "hidden"}`}>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="sidebar-item">
              <FiBarChart2 size={22} /> <span className={`${isOpen ? "block" : "hidden"}`}>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/settings" className="sidebar-item">
              <FiSettings size={22} /> <span className={`${isOpen ? "block" : "hidden"}`}>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
