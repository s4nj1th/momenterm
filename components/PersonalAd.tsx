"use client";
import { motion } from "framer-motion";
import { FiTrendingUp } from "react-icons/fi"; // Example Icons
import {
  PiHandTapFill,
  PiMagnifyingGlassFill,
  PiCheckCircleFill,
} from "react-icons/pi";

const icons = [
  PiHandTapFill,
  PiMagnifyingGlassFill,
  PiCheckCircleFill,
  FiTrendingUp,
]; // Icons Array

const timelineSteps = [
  {
    title: "Set Your Investment Preferences",
    description:
      "Tell us what matters to you—tech, sustainability, AI, healthcare, or specific companies. We personalize recommendations based on your interests.",
  },
  {
    title: "AI Analyzes Market Data",
    description:
      "Our AI scans real-time trends, financial reports, and historical data to find the best investment options tailored to you.",
  },
  {
    title: "Receive Personalized Recommendations",
    description:
      "Get a curated list of stocks and ETFs with insights, performance trends, and risk levels explained in simple terms.",
  },
  {
    title: "Your Portfolio Evolves Over Time",
    description:
      "As markets shift, our AI adapts your recommendations and alerts you to important updates.",
  },
];

export default function PersonalAd() {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-6 relative flex flex-col items-center text-center">
      <motion.h2
        className="w-fit text-4xl md:text-5xl font-bold mb-14 px-2 py-1 text-[var(--text-color)]"
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
        Make it your own
      </motion.h2>

      <div className="relative flex flex-col md:flex-row md:justify-between gap-12 w-full">
        {/* Horizontal Line (Desktop) */}
        <div className="hidden md:block absolute top-[38px] left-[12%] w-[76%] h-[2px] bg-[var(--accent-color)]" />

        {/* Vertical Line (Mobile) */}
        <div className="md:hidden absolute left-3 top-0 h-full w-[2px] bg-[var(--accent-color)]" />

        {timelineSteps.map((step, index) => {
          const Icon = icons[index % icons.length]; // Assign unique icon per step

          return (
            <motion.div
              key={index}
              className="relative flex md:flex-col items-start md:items-center gap-4 w-full md:w-1/4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Step Content */}
              <div className="pl-8 md:pl-0 text-left md:text-center relative">
                {/* Wrap the Title and Icon Together */}
                <motion.div
                  className="relative inline-block"
                  whileHover="hover" // Triggers hover animation
                  initial="initial"
                >
                  {/* Icon - Uses Variants to Sync with Hover */}
                  <motion.div
                    className="absolute -top-5 left-0 -translate-x-1/2 mx-auto text-[var(--text-color-hf)] z-50"
                    variants={{
                      initial: {
                        opacity: 0,
                        scale: 1,
                        x: 0,
                        y: 0
                      },
                      hover: {
                        opacity: 1,
                        scale: 1.2,
                        x: -5,
                        y: -5
                      },
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Icon size={40} />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="relative z-10 text-lg md:text-xl md:border md:hover:border-transparent md:border-[var(--accent-color)] 
                    font-bold text-[var(--text-color)] bg-[var(--sec-bg-op)] 
                    hover:scale-[1.05] hover:bg-[var(--accent-lighter)] hover:text-[var(--alt-text-color)]
                    transition-all duration-300 ease-in-out px-6 py-4 rounded-lg inline-block"
                  >
                    {step.title}
                  </motion.h3>
                </motion.div>

                {/* Description - Moves Up Slightly Under Title */}
                <p className="relative md:-mt-4 md:mx-1 text-sm md:text-base opacity-80 md:bg-[var(--sec-bg-op)] px-4 pb-4 md:pt-8 pt-4 rounded-lg z-0">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

