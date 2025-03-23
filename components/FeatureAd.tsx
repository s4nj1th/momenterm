"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function FeaturesAd() {
  const features = [
    "Real-time investment tracking with up-to-the-second updates",
    "Advice from the best AI models trained on millions of market data points",
    "Smart insights to help you choose investments wisely and maximize profits",
    "News and updates needed to know the happenings",
    "Updates and alerts for your favorite stocks",
  ];

  const explanations = [
    "Track your portfolio with real-time data updates, ensuring you never miss an important change.",
    "Get investment strategies powered by AI, leveraging historical and real-time market data for better decisions.",
    "Our AI provides actionable insights, identifying trends and helping you optimize your investments.",
    "Stay informed with the latest financial news and trends, ensuring you make decisions based on the latest data.",
    "Receive customized alerts for stocks you follow, keeping you updated on critical market changes.",
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeExplanation, setActiveExplanation] = useState<string | null>(null);

  // Delay clearing the explanation when no feature is hovered
  useEffect(() => {
    if (hoveredIndex === null) {
      const timeout = setTimeout(() => setActiveExplanation(null), 200);
      return () => clearTimeout(timeout);
    } else {
      setActiveExplanation(explanations[hoveredIndex]);
    }
  }, [hoveredIndex]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-screen-lg mx-auto py-12 px-6">
      {/* Left Section - Title & Explanation Container */}
      <div className="md:w-1/2 text-center relative">
        <motion.div
          className="flex flex-col items-center"
          animate={{ y: activeExplanation ? -30 : 0 }} // Moves up when explanation is shown
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Title with Soft Brightening & Dimming Animation */}
          <motion.h2
            className="relative text-4xl md:text-5xl font-bold mb-8 px-2 py-1 text-[var(--text-color)]"
            animate={{ backgroundColor: ["var(--accent-lit-tra)", "var(--accent-tra)"] }}
            transition={{delay: 2, duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          >
            Smarter Investing Starts Here
          </motion.h2>

          {/* Explanation with Smooth Text Transition */}
          <div className="h-10">
            <AnimatePresence mode="wait">
              {activeExplanation && (
                <motion.p
                  key={activeExplanation}
                  className="relative text-xl font-medium text-[var(--text-color)] opacity-80"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeExplanation}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Right Section - Feature List */}
      <div className="md:w-1/2 flex flex-col gap-4">
        {features.map((feature, index) => (
          <div key={index} className="hover:bg-[var(--secondary-bg)] rounded-lg">
            <motion.div
              className="bg-[var(--secondary-bg)] shadow-lg rounded-lg p-6 w-full text-center cursor"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <p className="text-lg font-medium opacity-90">{feature}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
