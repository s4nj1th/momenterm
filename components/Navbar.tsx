import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { GiTwoCoins } from "react-icons/gi";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function Navbar({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  return (
    <header className="navbar w-full h-16 fixed top-0 left-0 p-4 flex justify-between items-center px-[5vw] z-50">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="text-white text-2xl p-2 rounded-md hover:bg-[var(--secondary-bg)] transition cursor-pointer"
        >
          <FiMenu />
        </button>

        <Link
          href="/"
          className="flex items-center text-2xl font-bold text-white px-2 space-x-2"
        >
          <GiTwoCoins size={40} className="text-[var(--accent-lighter)]" />
          <span>MomenTerm</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignUpButton>
            <button className="button-outline">Sign up</button>
          </SignUpButton>
          <SignInButton>
            <button className="button">Log in</button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}
