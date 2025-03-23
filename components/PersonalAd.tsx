"use client";
import { motion } from "framer-motion";

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
    <div className="w-full max-w-6xl mx-auto py-12 px-6 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--text-color)]">
        How We Personalize Your Investments
      </h2>

      <div className="relative flex flex-col md:flex-row md:justify-between gap-12">
        {/* Horizontal Line (Desktop) */}
        <div className="hidden md:block absolute top-[38px] left-[12%] w-[76%] h-[2px] bg-[var(--accent-color)]" />

        {/* Vertical Line (Mobile) */}
        <div className="md:hidden absolute left-3 top-0 h-full w-[2px] bg-[var(--accent-color)]" />

        {timelineSteps.map((step, index) => (
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
              {/* Title - Positioned Over Description */}
              <h3
                className="relative z-10 text-lg md:text-xl md:border md:hover:border-transparent md:border-[var(--accent-color)] 
      font-bold text-[var(--text-color)] bg-[var(--sec-bg-op)] 
      hover:scale-[1.05] hover:bg-[var(--accent-lighter)] hover:text-[var(--alt-text-color)]
      transition-all duration-300 ease-in-out px-6 py-4 rounded-lg inline-block"
              >
                {step.title}
              </h3>

              {/* Description - Moves Up Slightly Under Title */}
              <p className="relative md:-mt-4 md:mx-1 text-sm md:text-base opacity-80 md:bg-[var(--sec-bg-op)] px-4 pb-4 md:pt-8 pt-4 rounded-lg z-0">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
