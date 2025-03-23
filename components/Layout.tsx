"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import SidebarSm from "./SidebarSm";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 640;
      setIsMobile(mobileView);
      setIsSidebarOpen(false); // Default collapsed
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen text-[var(--text-color)] bg-[var(--primary-bg)]">
      {/* Desktop Sidebar - Starts Collapsed */}
      {!isMobile && <Sidebar isOpen={isSidebarOpen} />}

      {/* Mobile Sidebar */}
      {isMobile && <SidebarSm isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}

      {/* Main Content */}
      <div
        className={`relative flex flex-col transition-all duration-300 ${
          isMobile
            ? "w-full"
            : isSidebarOpen
            ? "w-[calc(100%-14rem)] ml-56"
            : "w-[calc(100%-4rem)] ml-16"
        }`}
      >
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="p-6 mt-8">{children}</main>
      </div>
    </div>
  );
}
