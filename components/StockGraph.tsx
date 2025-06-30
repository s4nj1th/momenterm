"use client";

import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

export default function StockGraph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [data, setData] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const animationRef = useRef<number | null>(null);
  const lastUpdateTime = useRef(0);
  const updateInterval = 100;
  const MAX_POINTS = 200;

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (ctx) ctx.scale(dpr, dpr);
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const drawGraph = (canvas: HTMLCanvasElement, data: number[]) => {
    const ctx = canvas.getContext("2d");
    if (!ctx || data.length === 0) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const minVal = Math.min(...data, 30);
    const maxVal = Math.max(...data, 100);
    const range = maxVal - minVal || 1;

    const verticalPadding = 20;
    const graphHeight = height - verticalPadding * 2;

    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "#db67e679");
    gradient.addColorStop(0.5, "#db67e6");
    gradient.addColorStop(1, "#f581ff");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const firstY = height - verticalPadding - ((data[0] - minVal) / range) * graphHeight;
    ctx.moveTo(0, firstY);

    data.forEach((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - verticalPadding - ((val - minVal) / range) * graphHeight;
      ctx.lineTo(x, y);
    });

    ctx.stroke();

    // Fill under the curve
    const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
    fillGradient.addColorStop(0, "#db67e679");
    fillGradient.addColorStop(0.5, "#db67e644");
    fillGradient.addColorStop(1, "#0000");

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    ctx.fillStyle = fillGradient;
    ctx.fill();
  };

  const updateGraph = (timestamp: number) => {
    if (timestamp - lastUpdateTime.current < updateInterval) {
      animationRef.current = requestAnimationFrame(updateGraph);
      return;
    }

    lastUpdateTime.current = timestamp;

    setData((prev) => {
      if (prev.length >= MAX_POINTS) {
        setIsRunning(false);
        return prev;
      }

      const lastValue = prev[prev.length - 1] ?? 50;
      const trendUp = Math.random() < 0.7;
      let change = Math.random() * 5 * (trendUp ? 1 : -1);
      if (Math.random() < 0.05) change *= 4;

      return [...prev, lastValue + change];
    });

    if (isRunning) {
      animationRef.current = requestAnimationFrame(updateGraph);
    }
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
    if (canvas) drawGraph(canvas, data);
  }, [data]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
      <button
        onClick={() => setIsRunning((prev) => !prev)}
        className="absolute top-4 right-4 z-10 px-4 py-2 bg-[var(--accent-lighter)] text-sm rounded flex items-center gap-2 hover:opacity-90 transition"
        aria-label={isRunning ? "Pause simulation" : "Resume simulation"}
      >
        {isRunning ? <><FaPause /> Pause</> : <><FaPlay /> Resume</>}
      </button>
    </div>
  );
}
