"use client";
import { useEffect, useRef, useState } from "react";

export default function GridLines() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Resize canvas dynamically
  useEffect(() => {
    const resizeCanvas = () => {
      setCanvasSize({ width: window.innerWidth * 0.8, height: window.innerHeight * 0.7 });
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Draw centered grid lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvasSize;
    canvas.width = width;
    canvas.height = height;

    const minGridSpacing = 100; // Minimum spacing between lines

    // Calculate number of lines ensuring they remain centered
    const numVerticalLines = Math.ceil(width / minGridSpacing);
    const numHorizontalLines = Math.ceil(height / minGridSpacing);

    const actualGridSpacingX = width / numVerticalLines;
    const actualGridSpacingY = height / numHorizontalLines;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "hsla(0, 0%, 40%, 0.09)";
    ctx.lineWidth = 1;

    // Find center offsets
    const xOffset = (width % actualGridSpacingX) / 2;
    const yOffset = (height % actualGridSpacingY) / 2;

    // Draw vertical lines centered
    for (let i = 0; i <= numVerticalLines; i++) {
      const x = xOffset + i * actualGridSpacingX;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw horizontal lines centered
    for (let i = 0; i <= numHorizontalLines; i++) {
      const y = yOffset + i * actualGridSpacingY;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }, [canvasSize]);

  return <canvas ref={canvasRef} className="absolute inset-0 bg-transparent" />;
}
