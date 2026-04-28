"use client";

import { useState, useEffect } from "react";
import { Activity, ArrowDownLeft, ArrowUpRight, FileCode, Heart, Layers, Send, Sparkles, Wallet, Zap } from "lucide-react";
import { Transaction, MOCK_TRANSACTIONS } from "@/lib/mockData";

const typeConfig = {
  swap: { icon: Send, color: "text-pharos-electric", bg: "bg-pharos-electric/10", label: "Swap" },
  mint: { icon: Sparkles, color: "text-pharos-success", bg: "bg-pharos-success/10", label: "Mint" },
  transfer: { icon: ArrowUpRight, color: "text-pharos-warning", bg: "bg-pharos-warning/10", label: "Transfer" },
  deploy: { icon: FileCode, color: "text-pharos-neon", bg: "bg-pharos-neon/10", label: "Deploy" },
  vote: { icon: Heart, color: "text-pink-400", bg: "bg-pink-400/10", label: "Vote" },
  stake: { icon: Layers, color: "text-pharos-success", bg: "bg-pharos-success/10", label: "Stake" },
};

function generateRandomTx(): Transaction {
  const types = ["swap", "mint", "transfer", "deploy", "vote", "stake"] as const;
  const apps = ["PharosSwap", "ChainQuest", "NFTVerse", "StakeVault", "SocialFi Hub", "PharosPay", "YieldFarm Pro"];
  const tokens = ["PHA", "USDC", "ETH", "BTC", "USDT", "WBTC"];
  
  const type = types[Math.floor(Math.random() * types.length)];
  const hasApp = ["swap", "mint", "stake", "vote"].includes(type);
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
    type,
    from: `0x${Math.random().toString(16).substr(2, 8)}...`,
    to: hasApp ? apps[Math.floor(Math.random() * apps.length)] : `0x${Math.random().toString(16).substr(2, 8)}...`,
    amount: Math.floor(Math.random() * 1000000),
    token: tokens[Math.floor(Math.random() * tokens.length)],
    app: hasApp ? apps[Math.floor(Math.random() * apps.length)] : undefined,
    timestamp: new Date(),
  };
}

export default function LiveFeedPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setTransactions(prev => {
        const newTx = generateRandomTx();
        return [newTx, ...prev.slice(0, 49)];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Activity className="w-8 h-8 text-pharos-electric animate-pulse" />
              Live Feed
            </h1>
            <p className="text-pharos-muted">Real-time transactions on Pharos mainnet</p>
          </div>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isPaused
                ? "bg-pharos-warning/20 text-pharos-warning"
                : "bg-pharos-card border border-pharos-border text-pharos-muted"
            }`}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`w-3 h-3 rounded-full ${isPaused ? "bg-pharos-warning" : "bg-pharos-success animate-pulse"}`} />
          <span className="text-sm text-pharos-muted font-mono">
            {isPaused ? "PAUSED" : "LIVE"} • {transactions.length} events
          </span>
        </div>

        {/* Terminal */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-pharos-card border-b border-pharos-border">
            <div className="w-3 h-3 rounded-full bg-pharos-danger" />
            <div className="w-3 h-3 rounded-full bg-pharos-warning" />
            <div className="w-3 h-3 rounded-full bg-pharos-success" />
            <div className="ml-4 font-mono text-sm text-pharos-muted">
              pharos-node ~ live-feed
            </div>
          </div>

          {/* Terminal content */}
          <div className="p-4 font-mono text-sm max-h-[600px] overflow-y-auto">
            {transactions.map((tx, index) => (
              <TransactionLine key={tx.id} tx={tx} isNew={index === 0} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pharos-electric">
              {transactions.filter(t => t.type === "swap").length}
            </div>
            <div className="text-xs text-pharos-muted">Swaps</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pharos-success">
              {transactions.filter(t => t.type === "mint").length}
            </div>
            <div className="text-xs text-pharos-muted">Mints</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pharos-neon">
              {transactions.filter(t => t.type === "deploy").length}
            </div>
            <div className="text-xs text-pharos-muted">Deploys</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TransactionLine({ tx, isNew }: { tx: Transaction; isNew: boolean }) {
  const config = typeConfig[tx.type];
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-4 py-2 px-3 rounded-lg mb-1 transition-all ${
      isNew ? "bg-pharos-electric/5 animate-slide-up" : "hover:bg-pharos-card/30"
    }`}>
      <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center`}>
        <Icon className={`w-4 h-4 ${config.color}`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${config.color}`}>{config.label}</span>
          <span className="text-pharos-muted">
            {tx.from.slice(0, 8)}...{tx.from.slice(-4)}
          </span>
          {tx.type === "transfer" ? (
            <>
              <ArrowRight className="w-3 h-3 text-pharos-muted" />
              <span className="text-pharos-muted">
                {tx.to.slice(0, 8)}...{tx.to.slice(-4)}
              </span>
            </>
          ) : (
            <span className="text-pharos-muted">→ {tx.to}</span>
          )}
        </div>
      </div>
      
      <div className="text-right flex-shrink-0">
        <div className="text-white">
          {tx.amount.toLocaleString()} {tx.token}
        </div>
        <div className="text-xs text-pharos-muted">
          {timeSince(tx.timestamp)}
        </div>
      </div>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function timeSince(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
}