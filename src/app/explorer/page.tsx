"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ExternalLink, TrendingUp, Activity, ArrowUp, ArrowDown, Flame } from "lucide-react";

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
    <div className="min-h-screen bg-[#06060a] text-white">
      {/* Header */}
      <header className="border-b border-[#1a1a24] bg-[#06060a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
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
                  i === 1 ? "text-[#00d4ff] bg-[#00d4ff]/10" : "text-gray-400 hover:text-white hover:bg-[#1a1a24]"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Ecosystem Explorer</h1>
          <p className="text-gray-400">Discover all 52 apps on Pharos mainnet</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search apps..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#0d0d14] border border-[#1a1a24] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  category === cat
                    ? "bg-[#00d4ff] text-[#06060a]"
                    : "bg-[#0d0d14] border border-[#1a1a24] text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApps.map(app => (
            <Link
              key={app.id}
              href={`/app/${app.slug}`}
              className="group rounded-2xl bg-[#0d0d14] border border-[#1a1a24] p-5 hover:border-[#00d4ff]/30 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold" style={{ backgroundColor: app.color + "20", color: app.color }}>
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
              
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{app.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-[#1a1a24]">
                <div className="text-center">
                  <div className="text-sm font-semibold">{app.users}</div>
                  <div className="text-xs text-gray-500">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold">{app.volume}</div>
                  <div className="text-xs text-gray-500">Volume</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-semibold ${app.trend >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                    {app.trend >= 0 ? "+" : ""}{app.trend}%
                  </div>
                  <div className="text-xs text-gray-500">Trend</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}