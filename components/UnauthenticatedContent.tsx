import { useState, useEffect } from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { GiTwoCoins } from "react-icons/gi";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import HeroTitle from "./HeroTitle";
import StockGraph from "./StockGraph";
import GridLines from "./GridLines";
import FeaturesAd from "./FeatureAd";
import PersonalAd from "./PersonalAd";

export default function UnauthenticatedContent() {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollHint(window.scrollY < 50); // Hide when scrolled down
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      <div className="relative flex flex-col items-center justify-center h-screen min-h-screen">
        <div className="absolute w-[80vw] h-[80vh]">
          <StockGraph />
          <GridLines />
        </div>

        <div className="relative flex flex-col items-center justify-center w-[80vw] h-[80vh] text-center px-6">
          <HeroTitle />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-2 text-lg opacity-90"
          >
            Get insights and advice for your investments.
          </motion.p>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-10 flex flex-col items-center space-y-3 opacity-80"
          >
            <SignUpButton>
              <motion.button
                className="alt-button flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <span>Get Started</span>
                <GiTwoCoins className="icon" size={30} />
              </motion.button>
            </SignUpButton>

            <span className="text-sm text-[var(--text-color)] -mt-2">
              Already have an account?{" "}
              <SignInButton>
                <a className="text-[var(--accent-color)] hover:underline cursor-pointer">
                  Sign in
                </a>
              </SignInButton>
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: showScrollHint ? 1 : 0, y: showScrollHint ? 0 : 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute bottom-25 flex flex-col items-center justify-center"
        >
          <FiChevronDown className="text-2xl text-[var(--accent-color)] animate-bounce" />
        </motion.div>
      </div>

      <div className="w-full py-20 flex justify-center rounded-lg">
        <FeaturesAd />
      </div>

      <div className="w-full mt-50 py-20 flex justify-center rounded-lg">
        <PersonalAd />
      </div>

    </div>
  );
}
