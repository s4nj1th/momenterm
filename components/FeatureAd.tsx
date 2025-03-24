import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { LuSparkle } from "react-icons/lu";

export default function FeaturesAd() {
  const features = [
    "Real-time investment tracking with up-to-the-second updates",
    "Advice from the best AI models trained on millions of market data points",
    "Smart insights to help you choose investments wisely and maximize profits",
    "News and updates needed to know the happenings",
    "Updates and alerts for your favorite stocks",
  ];

  const explanations = [
    "Track your portfolio with real-time data updates, ensuring you never miss an important change. Stay on top of market fluctuations with live price tracking, performance analytics, and instant updates on your investments.",
    "Get investment strategies powered by AI, leveraging historical and real-time market data for better decisions. Our AI-driven system analyzes decades of historical data along with real-time trends to suggest optimal investment strategies.",
    "Our AI provides actionable insights, identifying trends and helping you optimize your investments. Gain a competitive edge with AI-driven market intelligence that identifies emerging trends before they become mainstream.",
    "Stay informed with the latest financial news and trends, ensuring you make decisions based on the latest data. Access curated financial news from trusted sources, along with in-depth market analysis and expert opinions.",
    "Receive customized alerts for stocks you follow, keeping you updated on critical market changes. Set up personalized notifications for price movements, earnings reports, breaking news, and significant technical indicators.",
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeExplanation, setActiveExplanation] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (hoveredIndex === null) {
      const timeout = setTimeout(() => setActiveExplanation(null), 200);
      return () => clearTimeout(timeout);
    } else {
      setActiveExplanation(explanations[hoveredIndex]);
    }
  }, [hoveredIndex]);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-screen-lg mx-auto py-4 px-6">
      {/* Left Section - Title & Explanation Container */}
      <div className="md:w-1/2 text-center relative">
        <motion.div className="flex flex-col items-center">
          {/* Title */}
          <motion.h2
            className="relative -top-20 text-4xl md:text-5xl font-bold mb-8 px-2 py-1 text-[var(--text-color)]"
            animate={{
              backgroundColor: ["var(--accent-lit-tra)", "var(--accent-tra)"],
            }}
            transition={{
              delay: 2,
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Smarter Investing Starts Here
          </motion.h2>

          {/* Explanation/Icon Section */}
          <div className="h-10 hidden md:block">
            <AnimatePresence mode="wait">
              {activeExplanation ? (
                <motion.p
                  key="explanation"
                  className="relative text-xl font-medium text-[var(--text-color)] opacity-80"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeExplanation}
                </motion.p>
              ) : (
                <motion.div
                  key="icon"
                  className="relative flex items-center text-[var(--text-color)]  justify-center"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: [0.4, 0.2, 0.4]}}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ opacity: 1 }} // Stops opacity animation on hover
                >
                  {/* Sparkle - Big (Lower Bounce) */}
                  <motion.div
                    className="absolute top-0 animate-bounce"
                    style={{
                      animationDuration: "10s", // Slower bounce
                    }}
                    initial={{ opacity: 0.8, scale: 0.9, y: 0 }}
                    animate={{ scale: [1, 1.03, 1], y: [0, -1, 0] }} // **Lower bounce**
                    transition={{
                      duration: 24,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ opacity: 1, scale: 1.2 }}
                  >
                    <LuSparkle size={140} />
                  </motion.div>

                  {/* Sparkle - Small (Higher & Faster Bounce) */}
                  <motion.div
                    className="absolute -top-15 left-12 animate-bounce"
                    style={{
                      animationDuration: "4s", // Faster bounce
                    }}
                    initial={{ opacity: 0.8, scale: 0.7, y: 0 }}
                    animate={{ scale: [1, 1.1, 1], y: [0, -5, 0] }} // **Higher bounce**
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                  >
                    <LuSparkle size={80} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Right Section - Feature List */}
      <div className="md:w-1/2 flex flex-col gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="hover:bg-[var(--sec-bg-op)] rounded-lg cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => toggleExpand(index)} // Mobile Click
          >
            {/* Feature Box */}
            <motion.div
              className="bg-[var(--sec-bg-op)] shadow-lg rounded-lg p-6 w-full text-center z-10"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-lg font-medium opacity-90">{feature}</p>
            </motion.div>

            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  className="-mt-2 px-4 py-3 bg-[var(--sec-bg-op)] rounded-lg transition-all shadow-md text-center text-[var(--text-color)] overflow-hidden"
                  initial={{ opacity: 0, maxHeight: 0 }}
                  animate={{ opacity: 1, maxHeight: 200 }} // Use maxHeight instead of height:auto
                  exit={{ opacity: 0, maxHeight: 0 }}
                  transition={{
                    opacity: { duration: 0.2, ease: "easeInOut" }, // Fade in smoothly
                    maxHeight: { duration: 0.3, ease: "easeInOut" }, // Expand smoothly
                  }}
                >
                  <motion.p
                    className="text-sm text-[var(--text-color)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.05, // Small delay to match container animation
                    }}
                  >
                    {explanations[index]}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
