"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, TrendingUp, Users, Zap, Clock, ArrowUpRight, Flame } from "lucide-react";
import { MOCK_APPS, formatNumber, formatCurrency, App } from "@/lib/mockData";

type Tab = "users" | "volume" | "growth" | "newest";

export default function RankingsPage() {
  const [tab, setTab] = useState<Tab>("users");

  const sortedApps = [...MOCK_APPS].sort((a, b) => {
    switch (tab) {
      case "users": return b.users_today - a.users_today;
      case "volume": return b.volume_24h - a.volume_24h;
      case "growth": return b.trend_percent - a.trend_percent;
      case "newest": return new Date(b.launched).getTime() - new Date(a.launched).getTime();
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
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-pharos-warning" />
            Rankings
          </h1>
          <p className="text-pharos-muted">Leaderboards for the Pharos ecosystem</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                  tab === t.id
                    ? "bg-pharos-electric text-pharos-bg"
                    : "bg-pharos-card border border-pharos-border text-pharos-muted hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Leaderboard */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-pharos-border text-sm font-medium text-pharos-muted">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">App</div>
            <div className="col-span-2 text-right">Users (24h)</div>
            <div className="col-span-2 text-right">Volume (24h)</div>
            <div className="col-span-2 text-right">Trend</div>
            <div className="col-span-1 text-right">Score</div>
          </div>

          {sortedApps.map((app, index) => (
            <RankingRow key={app.id} app={app} rank={index + 1} tab={tab} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RankingRow({ app, rank, tab }: { app: App; rank: number; tab: Tab }) {
  const getScore = () => {
    switch (tab) {
      case "users": return Math.round((app.users_today / 50000) * 100);
      case "volume": return Math.round((app.volume_24h / 50000000) * 100);
      case "growth": return Math.min(100, app.trend_percent * 3);
      case "newest": return Math.round(100 - (rank * 5));
      default: return 0;
    }
  };

  const getRankStyle = (r: number) => {
    if (r === 1) return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30";
    if (r === 2) return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/30";
    if (r === 3) return "bg-gradient-to-r from-amber-700/20 to-amber-800/20 border border-amber-700/30";
    return "";
  };

  return (
    <Link
      href={`/app/${app.slug}`}
      className={`grid grid-cols-12 gap-4 p-4 border-b border-pharos-border hover:bg-pharos-card/50 transition-colors items-center ${getRankStyle(rank)}`}
    >
      <div className="col-span-1">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
          rank === 1 ? "bg-yellow-500 text-black" :
          rank === 2 ? "bg-gray-400 text-black" :
          rank === 3 ? "bg-amber-700 text-white" :
          "bg-pharos-card text-pharos-muted"
        }`}>
          {rank}
        </div>
      </div>
      <div className="col-span-4 flex items-center gap-3">
        <img src={app.logo} alt={app.name} className="w-10 h-10 rounded-lg" />
        <div>
          <div className="font-semibold flex items-center gap-2">
            {app.name}
            {app.trend_percent > 15 && <Flame className="w-4 h-4 text-pharos-warning" />}
          </div>
          <div className="text-xs text-pharos-muted">{app.category}</div>
        </div>
      </div>
      <div className="col-span-2 text-right font-mono">
        {formatNumber(app.users_today)}
      </div>
      <div className="col-span-2 text-right font-mono">
        {formatCurrency(app.volume_24h)}
      </div>
      <div className="col-span-2 text-right">
        <span className={`font-medium ${app.trend_percent >= 0 ? "text-pharos-success" : "text-pharos-danger"}`}>
          {app.trend_percent >= 0 ? "+" : ""}{app.trend_percent}%
        </span>
      </div>
      <div className="col-span-1 text-right">
        <div className="w-12 h-6 bg-pharos-card rounded-full overflow-hidden ml-auto">
          <div
            className="h-full bg-gradient-to-r from-pharos-electric to-pharos-neon"
            style={{ width: `${getScore()}%` }}
          />
        </div>
      </div>
    </Link>
  );
}