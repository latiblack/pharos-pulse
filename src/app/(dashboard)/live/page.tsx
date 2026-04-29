'use client';

import { useState, useEffect } from "react";
import { Send, Sparkles, ArrowUpRight, FileCode, Heart, Layers, Pause, Play, Radio } from "lucide-react";

const typeConfig: Record<string, { icon: any; color: string; bg: string; label: string }> = {
  swap: { icon: Send, color: "#00d4ff", bg: "#00d4ff/10", label: "Swap" },
  mint: { icon: Sparkles, color: "#22c55e", bg: "#22c55e/10", label: "Mint" },
  transfer: { icon: ArrowUpRight, color: "#f59e0b", bg: "#f59e0b/10", label: "Transfer" },
  deploy: { icon: FileCode, color: "#a855f7", bg: "#a855f7/10", label: "Deploy" },
  vote: { icon: Heart, color: "#ec4899", bg: "#ec4899/10", label: "Vote" },
  stake: { icon: Layers, color: "#22c55e", bg: "#22c55e/10", label: "Stake" },
};

// Generate mock transactions
function generateTx(index: number) {
  const types = Object.keys(typeConfig);
  const type = types[Math.floor(Math.random() * types.length)];
  const config = typeConfig[type];
  
  const from = `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`;
  const to = `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`;
  
  const amounts = ["45,230 PHA", "15,000 USDC", "2.5 ETH", "NFT #2847", "50,000 PHA", "1,234 DAI"];
  
  return {
    id: index,
    type,
    from,
    to,
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    time: `${Math.floor(Math.random() * 59)}s ago`,
    txHash: `0x${Math.random().toString(16).substr(2, 8)}...`,
  };
}

export default function LivePage() {
  const [paused, setPaused] = useState(false);
  const [transactions, setTransactions] = useState(() => 
    Array.from({ length: 15 }, (_, i) => generateTx(i))
  );

  useEffect(() => {
    if (paused) return;
    
    const interval = setInterval(() => {
      setTransactions(prev => [generateTx(Date.now()), ...prev.slice(0, 20)]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div className="text-white">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--neon)]/30 to-[var(--electric)]/30 border border-[var(--neon)]/30 flex items-center justify-center">
              <Radio className="w-6 h-6 text-[var(--neon)] animate-live-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Live Feed</h1>
              <p className="text-[var(--text-muted)]">Real-time transactions on Pharos mainnet</p>
            </div>
          </div>
          
          <button
            onClick={() => setPaused(!paused)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              paused 
                ? "bg-[var(--electric)] text-black" 
                : "glass-card border border-[var(--border)]"
            }`}
          >
            {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </header>

      {/* Live Transactions */}
      <div className="glass-card overflow-hidden">
        {/* Stats Bar */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)] bg-[var(--electric-glow)]/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-[var(--electric)]" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-[var(--electric)] animate-ping opacity-75" />
              </div>
              <span className="text-sm font-medium">Live</span>
            </div>
            <div className="w-px h-4 bg-[var(--border)]" />
            <span className="text-sm text-[var(--text-muted)]">{transactions.length} transactions</span>
          </div>
          <div className="text-sm text-[var(--text-muted)]">
            Updating every 2s
          </div>
        </div>

        {/* Transaction List */}
        <div className="divide-y divide-[var(--border)]">
          {transactions.map((tx, index) => {
            const config = typeConfig[tx.type];
            const Icon = config.icon;
            
            return (
              <div 
                key={tx.id}
                className={`flex items-center justify-between p-4 transition-all hover:bg-[var(--electric-glow)]/10 ${
                  index === 0 ? 'bg-[var(--electric-glow)]/20' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Type Icon */}
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: config.bg, color: config.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  {/* Transaction Details */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium" style={{ color: config.color }}>{config.label}</span>
                      <span className="text-[var(--text-muted)]">•</span>
                      <span className="font-mono text-sm text-[var(--text-secondary)]">{tx.from}</span>
                      <span className="text-[var(--text-muted)]">→</span>
                      <span className="font-mono text-sm text-[var(--text-secondary)]">{tx.to}</span>
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      {tx.txHash}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-mono text-sm">{tx.amount}</div>
                  <div className="text-xs text-[var(--text-muted)]">{tx.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4">
        {Object.entries(typeConfig).map(([type, config]) => {
          const Icon = config.icon;
          return (
            <div key={type} className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: config.bg, color: config.color }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm text-[var(--text-muted)]">{config.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}