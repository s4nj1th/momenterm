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

  const width = 600;
  const height = 300;

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

      const lastValue = prev[prev.length - 1] || 50;
      const trendUp = Math.random() < 0.7;
      let change = Math.random() * 5 * (trendUp ? 1 : -1);
      if (Math.random() < 0.05) change *= 4;

      const newValue = lastValue + change;
      return [...prev, newValue];
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
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const minVal = Math.min(...data, 30);
    const maxVal = Math.max(...data, 100);
    const range = maxVal - minVal || 1;

    const graphHeight = height * 0.7;
    const graphTopPadding = height * 0.15;
    const graphWidth = width * 0.9;

    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "#db67e679");
    gradient.addColorStop(0.5, "#db67e6");
    gradient.addColorStop(1, "#f581ff");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const startX = 0;
    const firstY =
      graphTopPadding + graphHeight - ((data[0] - minVal) / range) * graphHeight;

    ctx.moveTo(startX, firstY);
    let lastX = startX;
    let lastY = firstY;

    data.forEach((val, i) => {
      const x = startX + (i / data.length) * graphWidth;
      const y =
        graphTopPadding + graphHeight - ((val - minVal) / range) * graphHeight;
      ctx.lineTo(x, y);
      lastX = x;
      lastY = y;
    });

    ctx.stroke();

    // Gradient Fill
    const fillGradient = ctx.createLinearGradient(0, graphTopPadding, 0, height);
    fillGradient.addColorStop(0, "#db67e679");
    fillGradient.addColorStop(0.5, "#db67e644");
    fillGradient.addColorStop(0.9, "#0000");

    ctx.fillStyle = fillGradient;
    ctx.lineTo(lastX, height);
    ctx.lineTo(startX, height);
    ctx.closePath();
    ctx.fill();
  }, [data]);

  return (
    <div className="flex justify-end w-full">
      <div className="w-full md:w-4/6 p-4 bg-[var(--secondary-bg)] rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">📈 Simulated Stock Graph</h2>
        <canvas
          ref={canvasRef}
          className="rounded-lg border w-full h-[400px] max-h-[350px]"
        />
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="mt-4 px-4 py-2 bg-[var(--accent-lighter)] text-sm rounded"
        >
          {isRunning ? (
            <span className="flex items-center gap-2">
              <FaPause /> Pause
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <FaPlay /> Resume
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
