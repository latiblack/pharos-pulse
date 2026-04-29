'use client';

import { useState } from "react";
import Link from "next/link";
import { Search, TrendingUp, Flame, ChevronRight, Grid3X3, List } from "lucide-react";

const apps = [
  { id: 1, name: "PharosSwap", slug: "pharosswap", category: "DeFi", description: "Leading DEX on Pharos with deep liquidity and low slippage", users: "28.5K", volume: "$45.7M", trend: 12.5, color: "#00d4ff" },
  { id: 2, name: "ChainQuest", slug: "chainquest", category: "Gaming", description: "Play-to-earn RPG adventure on Pharos blockchain", users: "45.7K", volume: "$12.3M", trend: 28.3, color: "#a855f7" },
  { id: 3, name: "NFTVerse", slug: "nftverse", category: "NFT", description: "Premium NFT marketplace with generative art", users: "18.2K", volume: "$23.5M", trend: 8.7, color: "#22c55e" },
  { id: 4, name: "StakeVault", slug: "stakevault", category: "DeFi", description: "Liquid staking protocol with auto-compounding", users: "12.3K", volume: "$34.6M", trend: 5.2, color: "#f59e0b" },
  { id: 5, name: "SocialFi Hub", slug: "socialfi", category: "Social", description: "Decentralized social platform with tokenized content", users: "34.6K", volume: "$567K", trend: 15.8, color: "#ec4899" },
  { id: 6, name: "PharosPay", slug: "pharospay", category: "Payments", description: "Fast, low-cost payments for merchants", users: "28.9K", volume: "$78.9M", trend: 22.1, color: "#06b6d4" },
  { id: 7, name: "RealToken", slug: "realtoken", category: "RWA", description: "Tokenized real estate investment platform", users: "4.5K", volume: "$12.3M", trend: 3.4, color: "#14b8a6" },
  { id: 8, name: "AIOracle", slug: "aioracle", category: "AI", description: "Decentralized AI inference network", users: "8.9K", volume: "$2.3M", trend: 45.2, color: "#8b5cf6" },
  { id: 9, name: "BridgeX", slug: "bridgex", category: "Infrastructure", description: "Cross-chain bridge with low fees", users: "15.7K", volume: "$156.8M", trend: 18.9, color: "#ef4444" },
  { id: 10, name: "YieldFarm Pro", slug: "yieldfarm", category: "DeFi", description: "High-yield farming with auto-compound", users: "19.2K", volume: "$28.9M", trend: 9.3, color: "#22c55e" },
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
    <div className="min-h-screen bg-deep text-white bg-grid bg-glow-top bg-glow-bottom">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Ecosystem Explorer
              </h1>
              <span className="badge" style={{ backgroundColor: 'var(--pharos-subtle)', color: 'var(--pharos)' }}>
                {apps.length} Apps
              </span>
            </div>
            <p className="text-[var(--text-muted)]">Discover all applications on Pharos mainnet</p>
          </div>
          
          {/* Stats */}
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <div className="text-2xl font-bold text-gradient">52</div>
              <div className="text-xs text-[var(--text-muted)]">Total Apps</div>
            </div>
            <div className="w-px h-10 bg-[var(--border-subtle)]" />
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
            className="input-search w-full pl-12 pr-4 py-3.5 text-base"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`category-pill ${category === cat ? 'active' : ''}`}
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
            className="card p-5 group hover:border-[var(--pharos)]/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold"
                style={{ 
                  backgroundColor: `${app.color}15`, 
                  color: app.color,
                  boxShadow: `0 0 30px ${app.color}20`
                }}
              >
                {app.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg truncate">{app.name}</h3>
                  {app.trend > 10 && <Flame className="w-4 h-4 text-[#f59e0b] flex-shrink-0" />}
                </div>
                <span 
                  className="badge"
                  style={{ backgroundColor: `${app.color}15`, color: app.color }}
                >
                  {app.category}
                </span>
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] mb-5 line-clamp-2">{app.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{app.users}</div>
                <div className="text-xs text-[var(--text-muted)]">Users</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">{app.volume}</div>
                <div className="text-xs text-[var(--text-muted)]">Volume</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: app.trend >= 0 ? '#10b981' : '#ef4444' }}>
                  {app.trend >= 0 ? "+" : ""}{app.trend}%
                </div>
                <div className="text-xs text-[var(--text-muted)]">Trend</div>
              </div>
            </div>

            {/* View arrow */}
            <div className="absolute top-5 right-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <ChevronRight className="w-5 h-5 text-[var(--pharos)]" />
            </div>
          </Link>
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-[var(--text-muted)]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No apps found</h3>
          <p className="text-[var(--text-muted)]">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}