"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, ExternalLink, TrendingUp, Users, Activity, ArrowUpRight } from "lucide-react";
import { MOCK_APPS, formatNumber, formatCurrency, CATEGORIES, App } from "@/lib/mockData";

export default function ExplorerPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"rank" | "users" | "volume" | "trend">("rank");

  const filteredApps = MOCK_APPS
    .filter((app) => {
      const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || app.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "rank") return a.rank - b.rank;
      if (sortBy === "users") return b.users_today - a.users_today;
      if (sortBy === "volume") return b.volume_24h - a.volume_24h;
      return b.trend_percent - a.trend_percent;
    });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Ecosystem Explorer</h1>
          <p className="text-pharos-muted">Discover all {MOCK_APPS.length} apps on Pharos mainnet</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pharos-muted" />
            <input
              type="text"
              placeholder="Search apps..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-pharos-card border border-pharos-border rounded-xl text-white placeholder-pharos-muted focus:outline-none focus:border-pharos-electric"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 bg-pharos-card border border-pharos-border rounded-xl text-white focus:outline-none focus:border-pharos-electric"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 bg-pharos-card border border-pharos-border rounded-xl text-white focus:outline-none focus:border-pharos-electric"
            >
              <option value="rank">Sort by Rank</option>
              <option value="users">Sort by Users</option>
              <option value="volume">Sort by Volume</option>
              <option value="trend">Sort by Trend</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                category === cat
                  ? "bg-pharos-electric text-pharos-bg"
                  : "bg-pharos-card border border-pharos-border text-pharos-muted hover:text-white"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-2 text-xs opacity-70">
                  ({MOCK_APPS.filter(a => a.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Apps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-16">
            <p className="text-pharos-muted">No apps found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AppCard({ app }: { app: App }) {
  return (
    <Link href={`/app/${app.slug}`} className="glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all group">
      {/* Banner */}
      <div className="h-24 relative">
        <img src={app.banner} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pharos-card to-transparent" />
        <div className="absolute top-3 right-3 px-2 py-1 text-xs font-medium bg-pharos-bg/80 rounded-lg">
          #{app.rank}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <img src={app.logo} alt={app.name} className="w-12 h-12 rounded-xl" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{app.name}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-pharos-neon/10 text-pharos-neon">
              {app.category}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-pharos-muted mb-4 line-clamp-2">{app.description}</p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 rounded-lg bg-pharos-bg/50">
            <div className="text-sm font-semibold">{formatNumber(app.users_today)}</div>
            <div className="text-xs text-pharos-muted">Users</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-pharos-bg/50">
            <div className="text-sm font-semibold">{formatCurrency(app.volume_24h)}</div>
            <div className="text-xs text-pharos-muted">Volume</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-pharos-bg/50">
            <div className={`text-sm font-semibold ${app.trend_percent >= 0 ? "text-pharos-success" : "text-pharos-danger"}`}>
              {app.trend_percent >= 0 ? "+" : ""}{app.trend_percent}%
            </div>
            <div className="text-xs text-pharos-muted">Trend</div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={app.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-pharos-electric/10 text-pharos-electric text-sm font-medium hover:bg-pharos-electric/20 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
            Visit
          </a>
          <Link
            href={`/app/${app.slug}`}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-pharos-card border border-pharos-border text-sm font-medium hover:border-pharos-electric transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Activity className="w-4 h-4" />
            Analytics
          </Link>
        </div>
      </div>
    </Link>
  );
}