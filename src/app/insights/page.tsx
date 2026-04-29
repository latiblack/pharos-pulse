"use client";

import Link from "next/link";
import { PieChart, TrendingUp, Flame, Activity, Zap, Users } from "lucide-react";

export default function InsightsPage() {
  const insights = [
    { title: "Hot Sector", value: "AI & Gaming", desc: "AIOracle + ChainQuest driving 73% of new user growth", icon: Zap, color: "#00d4ff" },
    { title: "Top Gainer", value: "AIOracle", desc: "+45.2% growth this week", icon: Flame, color: "#22c55e" },
    { title: "Volume Leader", value: "BridgeX", desc: "$156.8M in 24h", icon: Activity, color: "#a855f7" },
  ];

  const narratives = [
    { title: "DeFi Summer Returns", desc: "Total volume up 45% as yield opportunities attract institutional capital", metrics: ["TVL +$50M", "Volume +45%"] },
    { title: "Gaming Surge", desc: "Play-to-earn activity spikes with new seasonal rewards programs", metrics: ["DAU +28%", "Session +35%"] },
    { title: "Infrastructure Growth", desc: "Cross-chain bridges seeing record usage", metrics: ["Bridge +67%", "New chains +5"] },
    { title: "SocialFi Momentum", desc: "Decentralized social platforms gaining traction", metrics: ["Users +15%", "Content +89%"] },
  ];

  return (
    <div className="min-h-screen bg-[#06060a] text-white">
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
                  i === 4 ? "text-[#00d4ff] bg-[#00d4ff]/10" : "text-gray-400 hover:text-white hover:bg-[#1a1a24]"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <PieChart className="w-8 h-8 text-[#a855f7]" />
          Insights
        </h1>
        <p className="text-gray-400 mb-8">Auto-generated ecosystem intelligence</p>

        {/* Key Insights */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {insights.map((insight, i) => {
            const Icon = insight.icon;
            return (
              <div key={i} className="rounded-2xl bg-[#0d0d14] border border-[#1a1a24] p-6 hover:border-[#00d4ff]/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{insight.title}</span>
                  <Icon className="w-5 h-5" style={{ color: insight.color }} />
                </div>
                <div className="text-xl font-bold mb-1" style={{ color: insight.color }}>{insight.value}</div>
                <p className="text-sm text-gray-500">{insight.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Narratives */}
        <h2 className="text-lg font-semibold mb-4">Trending Narratives</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {narratives.map((n, i) => (
            <div key={i} className="rounded-xl bg-[#0d0d14] border border-[#1a1a24] p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{n.title}</h3>
                <TrendingUp className="w-4 h-4 text-[#22c55e]" />
              </div>
              <p className="text-sm text-gray-500 mb-3">{n.desc}</p>
              <div className="flex flex-wrap gap-2">
                {n.metrics.map((m, j) => (
                  <span key={j} className="px-2 py-1 text-xs rounded-md bg-[#1a1a24] text-[#00d4ff]">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {[
            { label: "Total Users", value: "213.5K" },
            { label: "Avg Session", value: "12.4m" },
            { label: "7-Day Retention", value: "34.2%" },
            { label: "30-Day Retention", value: "18.7%" },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl bg-[#0d0d14] border border-[#1a1a24] p-4 text-center">
              <div className="text-xl font-bold text-[#00d4ff]">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}