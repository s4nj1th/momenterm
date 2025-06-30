"use client";
import { useState, useEffect } from "react";
import PortfolioCard from "./PortfolioCard";
import StockGraph from "./StockGraph";

export default function AuthenticatedContent() {
  return (
    <div className="w-full space-y-8 text-[var(--text-color)] p-0 m-0">{/* Ensure no padding/margin */}
      <h1 className="text-3xl font-bold">Welcome Back to MomenTerm</h1>

      <div className="flex flex-row w-full gap-0">{/* Remove gap, force row, full width */}
        <div className="hidden md:block md:w-1/2"><PortfolioCard /></div>
        <div className="flex-1 w-full flex items-stretch"><StockGraph /></div>
      </div>
    </div>
  );
}
