import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "../assets/imgs/arrow-pointing-to-right.svg";

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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="relative -top-35 text-4xl md:text-5xl font-bold mb-8 px-2 py-1 text-[var(--text-color)]"
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
          </motion.div>

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
                  className="relative -mt-20 left-10 rotate-90"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: [0.7, 0.8, 0.7] }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.svg
                      className="w-60 h-60 fill-[var(--text-color-hf)] opacity-80"
                      viewBox="0 0 359.171 359.171"
                    >
                      <g>
                        <g>
                          <path
                            d="M351.689,201.729c-0.612-46.512-6.732-95.472-18.972-140.76c-3.061-9.792-17.748-6.12-15.301,4.284
                      c9.792,40.392,15.912,81.396,17.748,123.013c1.837,41.615,2.448,97.308-27.54,129.743c-15.3,16.524-42.84,15.912-63.647,17.137
                      c-30.601,1.836-61.812,1.224-92.412-0.612c-30.6-1.224-61.812-4.284-92.412-7.956c-16.524-1.836-43.452-11.016-58.14-3.06
                      c-1.224,0.611-1.224,2.447-0.612,3.06c11.016,14.076,42.228,13.464,58.752,15.912c36.72,4.896,72.828,7.344,109.548,9.18
                      c44.675,1.836,114.443,11.017,149.939-22.644C351.077,299.649,351.689,242.121,351.689,201.729z"
                          />
                          <path
                            d="M338.225,8.949c-4.284-6.12-11.628-4.896-14.688,1.836c-8.567,20.808-22.031,39.78-30.6,60.588
                      c-2.448,6.12,6.732,9.18,9.792,4.284c9.792-15.912,18.972-31.824,28.764-47.736c2.448,4.896,4.896,9.792,7.345,14.688
                      c3.06,7.956,3.672,15.912,7.344,23.256c2.447,5.508,9.792,3.06,11.628-1.224C363.929,47.505,348.017,23.025,338.225,8.949z"
                          />
                        </g>
                      </g>
                    </motion.svg>
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
