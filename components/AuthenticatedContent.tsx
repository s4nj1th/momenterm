"use client";
import { useState, useEffect } from "react";
import PortfolioCard from "./PortfolioCard";
import StockGraph from "./StockGraph";

export default function AuthenticatedContent() {
  return (
    <div className="p-6 space-y-8 text-[var(--text-color)]">
      <h1 className="text-3xl font-bold">Welcome Back to MomenTerm</h1>

      <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">{<PortfolioCard />}</div>
            <StockGraph />
      </div>

    </div>
  );
}
