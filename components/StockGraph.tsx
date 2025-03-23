"use client";
import "../styles/vars.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa";

export default function StockGraph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [data, setData] = useState<number[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [headPos, setHeadPos] = useState({ x: 0, y: 0 });
  const [isRunning, setIsRunning] = useState(true);
  const animationRef = useRef<number | null>(null);
  const lastUpdateTime = useRef(0);
  const updateInterval = 100;

  useEffect(() => {
    const resizeCanvas = () => {
      const width = window.innerWidth * 0.8;
      const height = window.innerHeight * 0.7;
      const maxHeight = width;
  
      // Calculate how much to shift down
      const verticalShift = height > maxHeight ? (height - maxHeight) / 2 : 0;
  
      setCanvasSize({ width, height, verticalShift });
    };
  
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const updateGraph = (timestamp: number) => {
    if (timestamp - lastUpdateTime.current < updateInterval) {
      animationRef.current = requestAnimationFrame(updateGraph);
      return;
    }

    lastUpdateTime.current = timestamp;

    setData((prev) => {
      const lastValue = prev[prev.length - 1] || 50;
      let trendUp = Math.random() < 0.7;
      let change = Math.random() * 5 * (trendUp ? 1 : -1);
      if (Math.random() < 0.05) change *= 4;

      const newValue = lastValue + change;
      return [...prev.slice(-120), newValue];
    });

    animationRef.current = requestAnimationFrame(updateGraph);
  };

  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(updateGraph);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvasSize;
    canvas.width = width;
    canvas.height = height;

    const minVal = Math.min(...data, 30);
    const maxVal = Math.max(...data, 100);
    const range = maxVal - minVal;

    const graphHeight = height * 0.7;
    const graphTopPadding = height * 0.15;
    const graphWidth = width * 0.8;

    ctx.clearRect(0, 0, width, height);

    // Gradient for main stock line
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "#db67e679");
    gradient.addColorStop(0.5, "#db67e6");
    gradient.addColorStop(1, "#f581ff");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.beginPath();

    const startX = 0;
    let firstX = startX;
    let firstY =
      graphTopPadding +
      graphHeight -
      ((data[0] - minVal) / range) * graphHeight;

    ctx.moveTo(firstX, firstY);
    let lastX = firstX;
    let lastY = firstY;

    data.forEach((val, i) => {
      const x = startX - 5 + (i / data.length) * graphWidth;
      const y =
        graphTopPadding + graphHeight - ((val - minVal) / range) * graphHeight;

      ctx.lineTo(x, y);
      lastX = x;
      lastY = y;
    });

    ctx.stroke();

    // Gradient Fill (Mountain Effect)
    const fillGradient = ctx.createLinearGradient(
      0,
      graphTopPadding,
      0,
      height
    );
    fillGradient.addColorStop(0, "#db67e679");
    fillGradient.addColorStop(0.5, "#db67e644");
    fillGradient.addColorStop(0.9, "#0000");

    ctx.fillStyle = fillGradient;
    ctx.lineTo(lastX, height);
    ctx.lineTo(startX, height);
    ctx.closePath();
    ctx.fill();

    // Dashed guide lines with fixed 0.7 opacity
    ctx.strokeStyle = "rgba(219, 103, 230, 0.7)";
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);

    // Left guide line
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(0, lastY);
    ctx.stroke();

    // Top guide line
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(lastX, 0);
    ctx.stroke();

    // Right guide line
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(width, lastY);
    ctx.stroke();

    // Bottom guide line
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(lastX, height);
    ctx.stroke();

    ctx.setLineDash([]);
  }, [data, canvasSize]);

  return (
    <>
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 bg-transparent pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-4 bg-[var(--secondary-bg)] text-[var(--text-color)] text-xs rounded-lg z-10 pointer-events-auto cursor-pointer"
      >
        {isRunning ? <FaPause /> : <FaPlay />}
      </button>
    </>
  );
}
