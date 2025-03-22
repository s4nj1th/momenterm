import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { GiTwoCoins } from "react-icons/gi";
import { motion } from "framer-motion";
import StockGraph from "./StockGraph";
import GridLines from "./GridLines";

export default function UnauthenticatedContent() {
  return (
    <div className="first-time-div relative flex flex-col items-center justify-center min-h-screen">
      {/* Background Graph */}
      <div className="absolute inset-0 z-0">
        <StockGraph />
        <GridLines />
      </div>

      {/* Main Content */}
      <div className="relative z-40 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl font-bold drop-shadow-lg"
        >
          Manage your Finances.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-2 text-lg opacity-90"
        >
          Get real-time advice for your investments.
        </motion.p>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-6 flex justify-center space-x-4 text-sm opacity-80"
        >
          <SignUpButton asChild>
            <motion.button className="alt-button flex items-center gap-2" whileHover={{ scale: 1.05 }}>
              <span>Get Started</span>
              <GiTwoCoins className="icon" size={30} />
            </motion.button>
          </SignUpButton>
        </motion.div>
      </div>

      {/* Centered Sign-in Link at Bottom */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm opacity-80 z-40"
      >
        <SignInButton>
          <span>
            Already have an account?{" "}
            <a className="plain-link cursor-pointer hover:underline">Sign in</a>
          </span>
        </SignInButton>
      </motion.div>
    </div>
  );
}
