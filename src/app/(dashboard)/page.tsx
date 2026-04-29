'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Users, 
  Activity, 
  Wallet, 
  Zap, 
  ArrowUp, 
  ArrowDown, 
  Flame, 
  Search,
  ChevronRight,
  Radio
} from "lucide-react";

// Chart data
const transactionData = [
  { time: "00:00", value: 2450000 },
  { time: "04:00", value: 2100000 },
  { time: "08:00", value: 3200000 },
  { time: "12:00", value: 4800000 },
  { time: "16:00", value: 5200000 },
  { time: "20:00", value: 4100000 },
  { time: "24:00", value: 3800000 },
];

const walletData = [
  { time: "Week 1", value: 125000 },
  { time: "Week 2", value: 145000 },
  { time: "Week 3", value: 168000 },
  { time: "Week 4", value: 195000 },
];

// App data
const trendingApps = [
  { id: 1, name: "PharosSwap", category: "DeFi", users: "28.5K", volume: "$45.7M", trend: 12.5, color: "#00d4ff" },
  { id: 2, name: "ChainQuest", category: "Gaming", users: "45.7K", volume: "$12.3M", trend: 28.3, color: "#a855f7" },
  { id: 3, name: "NFTVerse", category: "NFT", users: "18.2K", volume: "$23.5M", trend: 8.7, color: "#22c55e" },
  { id: 4, name: "StakeVault", category: "DeFi", users: "12.3K", volume: "$34.6M", trend: 5.2, color: "#f59e0b" },
];

const liveTxs = [
  { type: "swap", from: "0x7B2d...8C4a", to: "PharosSwap", amount: "45,230 PHA", time: "2s ago", color: "#00d4ff" },
  { type: "mint", from: "0x9F1a...2B3c", to: "NFTVerse", amount: "NFT #2847", time: "15s ago", color: "#22c55e" },
  { type: "transfer", from: "0x4D5e...6F7a", to: "0x8G9h...0I1j", amount: "15,000 USDC", time: "32s ago", color: "#f59e0b" },
  { type: "stake", from: "0x1A2b...3C4d", to: "StakeVault", amount: "50,000 PHA", time: "48s ago", color: "#22c55e" },
];

// Mini sparkline chart
function Sparkline({ data, color }: { data: { time: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  
  return (
    <div className="flex items-end gap-0.5 h-8 w-14">
      {data.map((d, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-xs"
          style={{
            height: `${((d.value - min) / range) * 100}%`,
            backgroundColor: color,
            minHeight: "2px",
            opacity: 0.7
          }}
        />
      ))}
    </div>
  );
}

// Stat card component
function StatCard({ label, value, change, icon: Icon }: { label: string; value: string; change?: number; icon: any }) {
  return (
    <div className="glass-card p-5 group hover:border-[var(--electric)]/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--electric-glow)] to-[var(--neon-glow)] border border-[var(--border)] flex items-center justify-center">
          <Icon className="w-5 h-5 text-[var(--electric)]" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${change >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
            {change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-xs text-[var(--text-muted)] mt-1">{label}</div>
    </div>
  );
}

// Bar chart component
function BarChart({ data, color, labels }: { data: { time: string; value: number }[]; color: string; labels?: boolean }) {
  const max = Math.max(...data.map(x => x.value));
  
  return (
    <div>
      <div className="flex items-end gap-1 h-32">
        {data.map((d, i) => {
          const height = (d.value / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-[var(--electric)] to-[var(--electric)]/60 shadow-[0_0_20px_var(--electric-dim)]"
                style={{ height: `${height}%`, minHeight: "4px" }}
              />
            </div>
          );
        })}
      </div>
      {labels && (
        <div className="flex justify-between mt-2 text-xs text-[var(--text-muted)]">
          {data.map((d, i) => (
            <span key={i}>{d.time}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-[var(--text-muted)] mt-1">Monitor the Pharos ecosystem in real-time</p>
          </div>
          
          {/* Live indicator */}
          <div className="flex items-center gap-3 px-4 py-2 glass-card">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--electric)]" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[var(--electric)] animate-ping opacity-75" />
            </div>
            <span className="text-sm font-medium">Live</span>
            <span className="text-xs text-[var(--text-muted)]">•</span>
            <span className="text-xs text-[var(--text-muted)]">52 apps</span>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Live Apps" value="52" icon={Zap} />
          <StatCard label="Transactions (24h)" value="2.85M" change={18.5} icon={Activity} />
          <StatCard label="Active Wallets" value="143K" change={12.3} icon={Wallet} />
          <StatCard label="New Wallets (24h)" value="8.9K" change={8.7} icon={Users} />
        </div>
      </section>

      {/* Charts */}
      <section className="mb-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Transactions Chart */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Transaction Volume</h3>
                <p className="text-sm text-[var(--text-muted)]">Last 24 hours</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--electric)]" />
                <span className="text-sm text-[var(--text-secondary)]">+18.5%</span>
              </div>
            </div>
            <BarChart data={transactionData} color="#00d4ff" labels />
          </div>

          {/* Wallet Growth Chart */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Wallet Growth</h3>
                <p className="text-sm text-[var(--text-muted)]">Last 30 days</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--neon)]" />
                <span className="text-sm text-[var(--text-secondary)]">+12.3%</span>
              </div>
            </div>
            <BarChart data={walletData} color="#a855f7" labels />
          </div>
        </div>
      </section>

      {/* Activity & Trending */}
      <section>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Trending Apps */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--electric)]" />
                Trending Apps
              </h3>
              <Link href="/explorer" className="text-sm text-[var(--electric)] hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {trendingApps.map((app, i) => (
                <Link 
                  key={app.id} 
                  href={`/app/${app.name.toLowerCase().replace(' ', '')}`}
                  className="flex items-center gap-4 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--electric)]/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" 
                    style={{ backgroundColor: app.color + "20", color: app.color }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{app.name}</span>
                      {app.trend > 10 && <Flame className="w-3 h-3 text-[#f59e0b] flex-shrink-0" />}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">{app.users} users • {app.volume}</div>
                  </div>
                  <Sparkline data={transactionData} color={app.color} />
                </Link>
              ))}
            </div>
          </div>

          {/* Live Feed */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Radio className="w-5 h-5 text-[var(--neon)] animate-live-pulse" />
                Live Feed
              </h3>
              <Link href="/live" className="text-sm text-[var(--neon)] hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-2 font-mono text-sm">
              {liveTxs.map((tx, i) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--electric)]/20 transition-colors ${i === 0 ? 'border-[var(--electric)]/20 bg-[var(--electric-glow)]' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: tx.color, boxShadow: `0 0 8px ${tx.color}` }} />
                    <span className="text-white capitalize">{tx.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[var(--text-secondary)]">{tx.amount}</div>
                    <div className="text-xs text-[var(--text-muted)]">{tx.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ecosystem Stats */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6">Ecosystem Overview</h3>
            
            <div className="space-y-4 mb-6">
              {[
                { label: "Total Value Locked", value: "$187.5M", change: "+12.4%" },
                { label: "Average TPS", value: "1,247", change: "+8.2%" },
                { label: "Smart Contracts", value: "1,247", change: "+23" },
                { label: "Categories", value: "8", change: "" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                  <span className="text-[var(--text-secondary)]">{item.label}</span>
                  <div className="text-right">
                    <span className="font-semibold text-white">{item.value}</span>
                    {item.change && (
                      <span className="ml-2 text-xs text-[#22c55e]">{item.change}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div>
              <div className="text-sm text-[var(--text-muted)] mb-3">Categories</div>
              <div className="flex flex-wrap gap-2">
                {["DeFi", "Gaming", "NFT", "Social", "Payments", "RWA", "AI", "Infra"].map(cat => (
                  <span key={cat} className="px-3 py-1.5 text-xs rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)]">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}