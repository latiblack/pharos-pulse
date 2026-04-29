"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { TrendingUp, Users, Activity, Wallet, Zap, ChevronRight, ArrowUp, ArrowDown, Flame, Sparkles, Token, Layers, FileCode, Heart, Send } from "lucide-react";

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

const apps = [
  { id: 1, name: "PharosSwap", category: "DeFi", users: "28.5K", volume: "$45.7M", trend: 12.5, color: "#00d4ff" },
  { id: 2, name: "ChainQuest", category: "Gaming", users: "45.7K", volume: "$12.3M", trend: 28.3, color: "#a855f7" },
  { id: 3, name: "NFTVerse", category: "NFT", users: "18.2K", volume: "$23.5M", trend: 8.7, color: "#22c55e" },
  { id: 4, name: "StakeVault", category: "DeFi", users: "12.3K", volume: "$34.6M", trend: 5.2, color: "#f59e0b" },
  { id: 5, name: "SocialFi", category: "Social", users: "34.6K", volume: "$567K", trend: 15.8, color: "#ec4899" },
];

const liveTxs = [
  { type: "swap", from: "0x7B2d...8C4a", to: "PharosSwap", amount: "45,230 PHA", time: "2s ago", color: "#00d4ff" },
  { type: "mint", from: "0x9F1a...2B3c", to: "NFTVerse", amount: "NFT #2847", time: "15s ago", color: "#22c55e" },
  { type: "transfer", from: "0x4D5e...6F7a", to: "0x8G9h...0I1j", amount: "15,000 USDC", time: "32s ago", color: "#f59e0b" },
  { type: "stake", from: "0x1A2b...3C4d", to: "StakeVault", amount: "50,000 PHA", time: "48s ago", color: "#22c55e" },
  { type: "deploy", from: "0x6E7f...8G9h", to: "Network", amount: "New Contract", time: "1m ago", color: "#a855f7" },
];

function MiniChart({ data, color }: { data: { time: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  
  return (
    <div className="flex items-end gap-0.5 h-12 w-20">
      {data.map((d, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm transition-all hover:opacity-80"
          style={{
            height: `${((d.value - min) / range) * 100}%`,
            backgroundColor: color,
            minHeight: "4px"
          }}
        />
      ))}
    </div>
  );
}

function StatCard({ label, value, change, icon: Icon }: { label: string; value: string; change?: number; icon: any }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0d0d14] border border-[#1a1a24] p-5 group hover:border-[#00d4ff]/30 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#00d4ff]" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${change >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
            {change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#06060a] text-white">
      {/* Header */}
      <header className="border-b border-[#1a1a24] bg-[#06060a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              PHAROS<span className="text-[#00d4ff]">PULSE</span>
            </span>
            <span className="px-2 py-0.5 text-[10px] font-medium bg-[#00d4ff]/15 text-[#00d4ff] rounded-full uppercase tracking-wider">
              Live
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            {["Dashboard", "Explorer", "Rankings", "Live", "Insights"].map((item, i) => (
              <button
                key={item}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  i === 0 ? "text-[#00d4ff] bg-[#00d4ff]/10" : "text-gray-400 hover:text-white hover:bg-[#1a1a24]"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0d0d14] border border-[#1a1a24]">
              <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-xs text-gray-400">52 Apps</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#00d4ff/8_0%,transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7]/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-5 tracking-tight">
            50+ Apps Live.{""}
            <br />
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#a855f7] bg-clip-text text-transparent">
              One Dashboard.
            </span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Track every major app, wallet trend, and ecosystem signal on Pharos mainnet in real time.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/explorer" className="px-6 py-3 bg-[#00d4ff] text-[#06060a] font-semibold rounded-xl hover:bg-[#00d4ff]/90 transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]">
              Explore Ecosystem
            </Link>
            <Link href="/live" className="px-6 py-3 bg-[#0d0d14] text-white font-semibold rounded-xl border border-[#1a1a24] hover:border-[#00d4ff]/30 transition-colors">
              View Live Activity
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard title="Live Apps" value="52" icon={Zap} />
            <StatCard title="Transactions (24h)" value="2.85M" change={18.5} icon={Activity} />
            <StatCard title="Active Wallets" value="143K" change={12.3} icon={Wallet} />
            <StatCard title="New Wallets" value="8.9K" change={8.7} icon={Users} />
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#0d0d14] border border-[#1a1a24] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Transactions</h2>
              <span className="text-xs text-gray-500">24h</span>
            </div>
            <div className="flex items-end gap-1 h-32">
              {transactionData.map((d, i) => {
                const max = Math.max(...transactionData.map(x => x.value));
                const height = (d.value / max) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-[#00d4ff] to-[#00d4ff]/60 rounded-t-sm"
                      style={{ height: `${height}%`, minHeight: "4px" }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              {transactionData.map((d, i) => (
                <span key={i}>{d.time}</span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#0d0d14] border border-[#1a1a24] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Wallet Growth</h2>
              <span className="text-xs text-gray-500">30d</span>
            </div>
            <div className="flex items-end gap-2 h-32">
              {walletData.map((d, i) => {
                const max = Math.max(...walletData.map(x => x.value));
                const height = (d.value / max) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-[#a855f7] to-[#a855f7]/60 rounded-t-sm"
                      style={{ height: `${height}%`, minHeight: "4px" }}
                    />
                    <span className="text-xs text-gray-500">{d.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Activity */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-4">
          {/* Trending */}
          <div className="rounded-2xl bg-[#0d0d14] border border-[#1a1a24] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00d4ff]" />
                Trending
              </h2>
              <Link href="/explorer" className="text-xs text-[#00d4ff] hover:underline">View All</Link>
            </div>
            <div className="space-y-3">
              {apps.map((app, i) => (
                <div key={app.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#06060a] border border-[#1a1a24] hover:border-[#1a1a24]/50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: app.color + "20" }}>
                    <div className="w-full h-full flex items-center justify-center text-lg" style={{ color: app.color }}>
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{app.name}</span>
                      {app.trend > 10 && <Flame className="w-3 h-3 text-[#f59e0b]" />}
                    </div>
                    <div className="text-xs text-gray-500">{app.users} users</div>
                  </div>
                  <MiniChart data={transactionData} color={app.color} />
                </div>
              ))}
            </div>
          </div>

          {/* Live Feed */}
          <div className="rounded-2xl bg-[#0d0d14] border border-[#1a1a24] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#a855f7]" />
                Live Feed
              </h2>
              <Link href="/live" className="text-xs text-[#a855f7] hover:underline">View All</Link>
            </div>
            <div className="space-y-2 font-mono text-sm">
              {liveTxs.map((tx, i) => (
                <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#1a1a24]/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tx.color }} />
                    <span className="text-white">{tx.type}</span>
                    <span className="text-gray-500 text-xs">{tx.from}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-300">{tx.amount}</div>
                    <div className="text-xs text-gray-600">{tx.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ecosystem */}
          <div className="rounded-2xl bg-[#0d0d14] border border-[#1a1a24] p-6">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Ecosystem</h2>
            <div className="space-y-3">
              {[
                { label: "TVL", value: "$187.5M" },
                { label: "Avg TPS", value: "1,247" },
                { label: "Contracts", value: "1,247" },
                { label: "Categories", value: "8" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[#1a1a24] last:border-0">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#1a1a24]">
              <div className="text-xs text-gray-500 mb-2">Categories</div>
              <div className="flex flex-wrap gap-1.5">
                {["DeFi", "Gaming", "NFT", "Social", "Payments", "RWA", "AI", "Infra"].map(cat => (
                  <span key={cat} className="px-2 py-1 text-xs rounded-md bg-[#1a1a24] text-gray-400">
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