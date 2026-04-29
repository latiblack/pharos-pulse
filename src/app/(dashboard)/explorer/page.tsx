'use client';

import { useState } from "react";
import Link from "next/link";
import { Search, TrendingUp, Flame, ChevronRight } from "lucide-react";

const apps = [
  { id: 1, name: "PharosSwap", slug: "pharosswap", category: "DeFi", description: "Leading DEX on Pharos with deep liquidity", users: "28.5K", volume: "$45.7M", trend: 12.5, color: "#00d4ff" },
  { id: 2, name: "ChainQuest", slug: "chainquest", category: "Gaming", description: "Play-to-earn RPG adventure", users: "45.7K", volume: "$12.3M", trend: 28.3, color: "#a855f7" },
  { id: 3, name: "NFTVerse", slug: "nftverse", category: "NFT", description: "Premium NFT marketplace", users: "18.2K", volume: "$23.5M", trend: 8.7, color: "#22c55e" },
  { id: 4, name: "StakeVault", slug: "stakevault", category: "DeFi", description: "Liquid staking with auto-compounding", users: "12.3K", volume: "$34.6M", trend: 5.2, color: "#f59e0b" },
  { id: 5, name: "SocialFi Hub", slug: "socialfi", category: "Social", description: "Decentralized social platform", users: "34.6K", volume: "$567K", trend: 15.8, color: "#ec4899" },
  { id: 6, name: "PharosPay", slug: "pharospay", category: "Payments", description: "Fast, low-cost payments", users: "28.9K", volume: "$78.9M", trend: 22.1, color: "#06b6d4" },
  { id: 7, name: "RealToken", slug: "realtoken", category: "RWA", description: "Tokenized real estate", users: "4.5K", volume: "$12.3M", trend: 3.4, color: "#14b8a6" },
  { id: 8, name: "AIOracle", slug: "aioracle", category: "AI", description: "Decentralized AI inference", users: "8.9K", volume: "$2.3M", trend: 45.2, color: "#8b5cf6" },
  { id: 9, name: "BridgeX", slug: "bridgex", category: "Infrastructure", description: "Cross-chain bridge", users: "15.7K", volume: "$156.8M", trend: 18.9, color: "#ef4444" },
  { id: 10, name: "YieldFarm Pro", slug: "yieldfarm", category: "DeFi", description: "High-yield farming", users: "19.2K", volume: "$28.9M", trend: 9.3, color: "#22c55e" },
];

const categories = ["All", "DeFi", "Gaming", "NFT", "Infrastructure", "Social", "Payments", "RWA", "AI"];

export default function ExplorerPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || app.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="text-white">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ecosystem Explorer</h1>
            <p className="text-[var(--text-muted)] mt-1">Discover all 52 apps on Pharos mainnet</p>
          </div>
          
          {/* Stats */}
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <div className="text-2xl font-bold text-[var(--electric)]">52</div>
              <div className="text-xs text-[var(--text-muted)]">Total Apps</div>
            </div>
            <div className="w-px h-10 bg-[var(--border)]" />
            <div className="text-right">
              <div className="text-2xl font-bold">8</div>
              <div className="text-xs text-[var(--text-muted)]">Categories</div>
            </div>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search apps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--electric)]/50 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                category === cat
                  ? "bg-gradient-to-r from-[var(--electric)] to-[var(--neon)] text-black font-semibold"
                  : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--electric)]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredApps.map(app => (
          <Link
            key={app.id}
            href={`/app/${app.slug}`}
            className="group glass-card p-5 hover:border-[var(--electric)]/40 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold" 
                style={{ backgroundColor: app.color + "20", color: app.color }}>
                {app.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{app.name}</h3>
                  {app.trend > 10 && <Flame className="w-4 h-4 text-[#f59e0b] flex-shrink-0" />}
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: app.color + "20", color: app.color }}>
                  {app.category}
                </span>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">{app.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
              <div className="text-center">
                <div className="text-sm font-semibold">{app.users}</div>
                <div className="text-xs text-[var(--text-muted)]">Users</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold">{app.volume}</div>
                <div className="text-xs text-[var(--text-muted)]">Volume</div>
              </div>
              <div className={`text-center ${app.trend >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                <div className="text-sm font-semibold">{app.trend >= 0 ? "+" : ""}{app.trend}%</div>
                <div className="text-xs text-[var(--text-muted)]">Trend</div>
              </div>
            </div>

            {/* View details arrow */}
            <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-5 h-5 text-[var(--electric)]" />
            </div>
          </Link>
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[var(--text-muted)]">No apps found matching your criteria</p>
        </div>
      )}
    </div>
  );
}