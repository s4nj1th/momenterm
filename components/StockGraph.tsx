"use client";
import { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa";

export default function StockGraph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [data, setData] = useState<number[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [headPos, setHeadPos] = useState({ x: 0, y: 0 });
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const resizeCanvas = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const updateGraph = () => {
      setData((prev) => {
        const lastValue = prev[prev.length - 1] || 50;
        let trendUp = Math.random() < 0.8;
        let change = Math.random() * 2 * (trendUp ? 1 : -1);
        if (Math.random() < 0.05) change *= 3;

        const newValue = lastValue + change;
        return [...prev.slice(-120), newValue];
      });
    };

    const interval = setInterval(updateGraph, 100);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvasSize;
    canvas.width = width;
    canvas.height = height;

    const highestPoint = Math.max(...data, 80);
    const baseline = highestPoint > 80 ? highestPoint - 60 : 20;
    const graphHeight = height * 0.6;
    const graphTopPadding = height * 0.15;

    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "#db67e679");
    gradient.addColorStop(0.5, "#db67e6");
    gradient.addColorStop(1, "#f581ff");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.beginPath();

    const graphWidth = width * 0.65;
    const startX = 0;

    let lastX = startX;
    let lastY =
      graphTopPadding +
      graphHeight -
      ((data[0] - baseline) / 100) * graphHeight;

    ctx.moveTo(startX, height);
    data.forEach((val, i) => {
      const x = startX - 5 + (i / data.length) * graphWidth;
      const y =
        graphTopPadding + graphHeight - ((val - baseline) / 100) * graphHeight;

      if (i === 0) ctx.lineTo(x, y);
      else ctx.lineTo(x, y);

      lastX = x;
      lastY = y;
    });

    ctx.lineTo(lastX, height);
    ctx.closePath();

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
    ctx.fill();

    ctx.stroke();

    animate(
      headPos,
      { x: lastX, y: lastY },
      { duration: 0.2, ease: "easeOut" }
    );

    setHeadPos({ x: lastX, y: lastY });

    ctx.strokeStyle = "hsla(0, 0%, 40%, 0.3)";
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(0, lastY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(width, lastY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(lastX, 0);
    ctx.stroke();

    ctx.setLineDash([]);
  }, [data, canvasSize]);

  return (
    <>
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 bg-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute bg-[#efefef] rounded-full z-10"
        style={{
          width: 12,
          height: 12,
          top: headPos.y - 6,
          left: headPos.x - 6,
        }}
        animate={{ x: headPos.x, y: headPos.y }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      <button
        onClick={() => setIsRunning(!isRunning)}
        className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-4 bg-[var(--secondary-bg)] text-white text-xs rounded-lg z-10 cursor-pointer"
      >
        {isRunning ? <FaPause /> : <FaPlay />}
        {/* {isRunning ? "Stop" : "Play"} */}
      </button>
    </>
  );
}
