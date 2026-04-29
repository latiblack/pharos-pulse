"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Activity, Pause, Play, Send, Sparkles, ArrowUpRight, FileCode, Heart, Layers } from "lucide-react";

const typeConfig: Record<string, { icon: any; color: string; bg: string; label: string }> = {
  swap: { icon: Send, color: "#00d4ff", bg: "#00d4ff/10", label: "Swap" },
  mint: { icon: Sparkles, color: "#22c55e", bg: "#22c55e/10", label: "Mint" },
  transfer: { icon: ArrowUpRight, color: "#f59e0b", bg: "#f59e0b/10", label: "Transfer" },
  deploy: { icon: FileCode, color: "#a855f7", bg: "#a855f7/10", label: "Deploy" },
  vote: { icon: Heart, color: "#ec4899", bg: "#ec4899/10", label: "Vote" },
  stake: { icon: Layers, color: "#22c55e", bg: "#22c55e/10", label: "Stake" },
};

const initialTxs = [
  { type: "swap", from: "0x7B2d8C4a", to: "PharosSwap", amount: "45,230 PHA", time: "2s" },
  { type: "mint", from: "0x9F1a2B3c", to: "NFTVerse", amount: "NFT #2847", time: "15s" },
  { type: "transfer", from: "0x4D5e6F7a", to: "0x8G9h0I1j", amount: "15,000 USDC", time: "32s" },
  { type: "stake", from: "0x1A2b3C4d", to: "StakeVault", amount: "50,000 PHA", time: "48s" },
  { type: "deploy", from: "0x6E7f8G9h", to: "Network", amount: "New Contract", time: "1m" },
  { type: "swap", from: "0x3A4b5C6d", to: "PharosSwap", amount: "12,890 ETH", time: "1m" },
  { type: "vote", from: "0x7C8d9E0f", to: "SocialFi", amount: "1 VOTE", time: "2m" },
  { type: "transfer", from: "0x2D3e4F5a", to: "0x6G7h8I9j", amount: "2,500,000 PHA", time: "2m" },
];

function generateTx() {
  const types = ["swap", "mint", "transfer", "deploy", "vote", "stake"];
  const apps = ["PharosSwap", "ChainQuest", "NFTVerse", "StakeVault", "SocialFi Hub", "PharosPay"];
  const tokens = ["PHA", "USDC", "ETH", "BTC", "USDT"];
  const type = types[Math.floor(Math.random() * types.length)];
  const hasApp = ["swap", "mint", "stake", "vote"].includes(type);
  
  return {
    type,
    from: `0x${Math.random().toString(16).slice(2, 10)}`,
    to: hasApp ? apps[Math.floor(Math.random() * apps.length)] : `0x${Math.random().toString(16).slice(2, 10)}`,
    amount: `${Math.floor(Math.random() * 100000).toLocaleString()} ${tokens[Math.floor(Math.random() * tokens.length)]}`,
    time: "now",
  };
}

export default function LiveFeedPage() {
  const [transactions, setTransactions] = useState(initialTxs);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setTransactions(prev => {
        const newTx = generateTx();
        return [newTx, ...prev.slice(0, 19)];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="min-h-screen bg-[#06060a] text-white">
      <header className="border-b border-[#1a1a24] bg-[#06060a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight">
              PHAROS<span className="text-[#00d4ff]">PULSE</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {["Dashboard", "Explorer", "Rankings", "Live", "Insights"].map((item, i) => (
              <Link
                key={item}
                href={i === 0 ? "/" : `/${item.toLowerCase()}`}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  i === 3 ? "text-[#00d4ff] bg-[#00d4ff]/10" : "text-gray-400 hover:text-white hover:bg-[#1a1a24]"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#00d4ff] animate-pulse" />
              Live Feed
            </h1>
            <p className="text-gray-400 mt-1">Real-time transactions on Pharos mainnet</p>
          </div>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              isPaused ? "bg-[#f59e0b]/20 text-[#f59e0b]" : "bg-[#0d0d14] border border-[#1a1a24] text-gray-400"
            }`}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className={`w-3 h-3 rounded-full ${isPaused ? "bg-[#f59e0b]" : "bg-[#22c55e] animate-pulse"}`} />
          <span className="text-sm text-gray-500 font-mono">{isPaused ? "PAUSED" : "LIVE"} • {transactions.length} events</span>
        </div>

        {/* Terminal */}
        <div className="rounded-2xl bg-[#0d0d14] border border-[#1a1a24] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0f] border-b border-[#1a1a24]">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
            <div className="ml-4 font-mono text-sm text-gray-500">pharos-node ~ live-feed</div>
          </div>

          <div className="p-2 font-mono text-sm max-h-[500px] overflow-y-auto">
            {transactions.map((tx, index) => {
              const config = typeConfig[tx.type];
              const Icon = config.icon;
              
              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 py-2.5 px-3 rounded-lg transition-all ${
                    index === 0 ? "bg-[#00d4ff]/5" : "hover:bg-[#1a1a24]/30"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: config.bg }}>
                    <Icon className="w-4 h-4" style={{ color: config.color }} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium" style={{ color: config.color }}>{config.label}</span>
                      <span className="text-gray-500">from</span>
                      <span className="text-gray-300">0x{tx.from.slice(-6)}</span>
                      <span className="text-gray-500">to</span>
                      <span className="text-gray-300">{tx.to}</span>
                    </div>
                  </div>
                  
                  <div className="text-right flex-shrink-0">
                    <div className="text-gray-300">{tx.amount}</div>
                    <div className="text-xs text-gray-600">{tx.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="rounded-xl bg-[#0d0d14] border border-[#1a1a24] p-4 text-center">
            <div className="text-2xl font-bold text-[#00d4ff]">
              {transactions.filter(t => t.type === "swap").length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Swaps</div>
          </div>
          <div className="rounded-xl bg-[#0d0d14] border border-[#1a1a24] p-4 text-center">
            <div className="text-2xl font-bold text-[#22c55e]">
              {transactions.filter(t => t.type === "mint").length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Mints</div>
          </div>
          <div className="rounded-xl bg-[#0d0d14] border border-[#1a1a24] p-4 text-center">
            <div className="text-2xl font-bold text-[#a855f7]">
              {transactions.filter(t => t.type === "deploy").length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Deploys</div>
          </div>
        </div>
      </div>
    </div>
  );
}