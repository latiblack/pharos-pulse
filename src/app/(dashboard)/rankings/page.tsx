'use client';

import { useState } from "react";
import Link from "next/link";
import { Trophy, TrendingUp, Users, Clock, Flame, Crown } from "lucide-react";

const apps = [
  { id: 1, name: "PharosSwap", category: "DeFi", users: 28500, volume: 45700000, trend: 12.5, color: "#00d4ff" },
  { id: 2, name: "ChainQuest", category: "Gaming", users: 45700, volume: 12300000, trend: 28.3, color: "#a855f7" },
  { id: 3, name: "NFTVerse", category: "NFT", users: 18200, volume: 23500000, trend: 8.7, color: "#22c55e" },
  { id: 4, name: "StakeVault", category: "DeFi", users: 12300, volume: 34600000, trend: 5.2, color: "#f59e0b" },
  { id: 5, name: "SocialFi Hub", category: "Social", users: 34600, volume: 567000, trend: 15.8, color: "#ec4899" },
  { id: 6, name: "PharosPay", category: "Payments", users: 28900, volume: 78900000, trend: 22.1, color: "#06b6d4" },
  { id: 7, name: "RealToken", category: "RWA", users: 4500, volume: 12300000, trend: 3.4, color: "#14b8a6" },
  { id: 8, name: "AIOracle", category: "AI", users: 8900, volume: 2300000, trend: 45.2, color: "#8b5cf6" },
  { id: 9, name: "BridgeX", category: "Infrastructure", users: 15700, volume: 156800000, trend: 18.9, color: "#ef4444" },
  { id: 10, name: "YieldFarm Pro", category: "DeFi", users: 19200, volume: 28900000, trend: 9.3, color: "#22c55e" },
];

type Tab = "users" | "volume" | "growth" | "newest";

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

function formatVolume(num: number): string {
  if (num >= 1000000) return "$" + (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return "$" + (num / 1000).toFixed(1) + "K";
  return "$" + num;
}

export default function RankingsPage() {
  const [tab, setTab] = useState<Tab>("users");

  const sortedApps = [...apps].sort((a, b) => {
    switch (tab) {
      case "users": return b.users - a.users;
      case "volume": return b.volume - a.volume;
      case "growth": return b.trend - a.trend;
      case "newest": return b.id - a.id;
      default: return 0;
    }
  });

  const tabs = [
    { id: "users", label: "Top Users", icon: Users },
    { id: "volume", label: "Top Volume", icon: Trophy },
    { id: "growth", label: "Fastest Growing", icon: TrendingUp },
    { id: "newest", label: "Newest", icon: Clock },
  ] as const;

  return (
    <div className="text-white">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#f59e0b]/50 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rankings</h1>
            <p className="text-[var(--text-muted)]">Leaderboards for the Pharos ecosystem</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                tab === t.id
                  ? "bg-gradient-to-r from-[var(--electric)] to-[var(--neon)] text-black font-semibold"
                  : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--electric)]/30"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Leaderboard */}
      <div className="glass-card overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-[var(--border)] text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">App</div>
          <div className="col-span-2 text-right">Users</div>
          <div className="col-span-2 text-right">Volume</div>
          <div className="col-span-2 text-right">Trend</div>
        </div>

        {sortedApps.map((app, index) => (
          <Link
            key={app.id}
            href={`/app/${app.name.toLowerCase().replace(" ", "")}`}
            className="grid grid-cols-12 gap-4 p-4 border-b border-[var(--border)] hover:bg-[var(--electric-glow)] transition-all items-center group"
          >
            <div className="col-span-1">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                index === 0 ? "bg-[#f59e0b]/20 text-[#f59e0b]" :
                index === 1 ? "bg-gray-400/20 text-gray-400" :
                index === 2 ? "bg-amber-700/20 text-amber-700" :
                "bg-[var(--border)] text-[var(--text-muted)]"
              }`}>
                {index === 0 ? <Crown className="w-4 h-4" /> : index + 1}
              </div>
            </div>
            <div className="col-span-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold" 
                style={{ backgroundColor: app.color + "20", color: app.color }}>
                {app.name[0]}
              </div>
              <div>
                <div className="font-medium flex items-center gap-2">
                  {app.name}
                  {app.trend > 15 && <Flame className="w-3 h-3 text-[#f59e0b]" />}
                </div>
                <div className="text-xs text-[var(--text-muted)]">{app.category}</div>
              </div>
            </div>
            <div className="col-span-2 text-right font-mono text-[var(--text-secondary)]">
              {formatNumber(app.users)}
            </div>
            <div className="col-span-2 text-right font-mono">
              <span className="text-white">{formatVolume(app.volume)}</span>
            </div>
            <div className="col-span-2 text-right">
              <span className={app.trend >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}>
                {app.trend >= 0 ? "+" : ""}{app.trend}%
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}