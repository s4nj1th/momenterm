import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function HeroTitle() {
  const words = ["Manage", "Track", "Boost", "Grow", "Know"];
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (index < words.length - 1) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, 2000); // Change every 2 seconds

      return () => clearInterval(interval);
    } else {
      setFinished(true);
    }
  }, [index]);

  return (
    <motion.h1
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-5xl font-bold drop-shadow-lg text-center"
    >
      <span className="relative inline-block">
        {/* Invisible span to maintain width */}
        <span ref={textRef} className="invisible absolute">
          Know
        </span>

        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]} // Makes each word unique so it animates
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`inline-block text-[var(--accent-color)] ${
              finished
                ? "text-[var(--accent-color)] underline"
                : "text-[var(--text-color)]"
            }`}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>{" "}
      Your Finances
    </motion.h1>
  );
}
