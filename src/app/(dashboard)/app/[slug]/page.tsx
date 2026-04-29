"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Globe, Copy, Check, TrendingUp, Users, Activity, Wallet, Flame, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";

const appData: Record<string, any> = {
  pharosswap: { name: "PharosSwap", category: "DeFi", description: "Leading DEX on Pharos with deep liquidity and low fees", users: "28.5K", volume: "$45.7M", trend: 12.5, tvl: "$89M", txs: "89.2K", launched: "Jan 15, 2026", color: "#00d4ff" },
  chainquest: { name: "ChainQuest", category: "Gaming", description: "Play-to-earn RPG adventure on Pharos blockchain", users: "45.7K", volume: "$12.3M", trend: 28.3, tvl: "$34M", txs: "156.8K", launched: "Jan 20, 2026", color: "#a855f7" },
  nftverse: { name: "NFTVerse", category: "NFT", description: "Premium NFT marketplace with generative art collections", users: "18.2K", volume: "$23.5M", trend: 8.7, tvl: "$28M", txs: "45.7K", launched: "Jan 18, 2026", color: "#22c55e" },
  stakevault: { name: "StakeVault", category: "DeFi", description: "Liquid staking protocol with auto-compounding", users: "12.3K", volume: "$34.6M", trend: 5.2, tvl: "$156M", txs: "23.5K", launched: "Jan 10, 2026", color: "#f59e0b" },
  socialfi: { name: "SocialFi Hub", category: "Social", description: "Decentralized social platform with tokenized content", users: "34.6K", volume: "$567K", trend: 15.8, tvl: "$8.9M", txs: "67.9K", launched: "Jan 25, 2026", color: "#ec4899" },
  pharospay: { name: "PharosPay", category: "Payments", description: "Fast, low-cost payments for merchants and consumers", users: "28.9K", volume: "$78.9M", trend: 22.1, tvl: "$12M", txs: "123.5K", launched: "Jan 12, 2026", color: "#06b6d4" },
};

const weeklyData = [
  { day: "Mon", value: 42000 },
  { day: "Tue", value: 48000 },
  { day: "Wed", value: 45000 },
  { day: "Thu", value: 52000 },
  { day: "Fri", value: 58000 },
  { day: "Sat", value: 49000 },
  { day: "Sun", value: 51000 },
];

export default function AppDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const app = appData[slug];
  const [copied, setCopied] = useState(false);

  if (!app) {
    return (
      <div className="min-h-screen bg-[#06060a] text-white p-8">
        <Link href="/explorer" className="text-[#00d4ff] hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Explorer
        </Link>
        <h1 className="text-2xl font-bold mt-8">App Not Found</h1>
      </div>
    );
  }

  const copyAddress = () => {
    navigator.clipboard.writeText("0x1234...5678");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const max = Math.max(...weeklyData.map(d => d.value));

  return (
    <div className="min-h-screen bg-[#06060a] text-white">
      {/* Banner */}
      <div className="h-40 md:h-56 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a24] to-[#06060a]" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${app.color}20 0%, transparent 50%)` }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-10">
        <Link href="/explorer" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="flex items-start gap-5 mb-8">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold" style={{ backgroundColor: app.color + "20", color: app.color }}>
            {app.name[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{app.name}</h1>
              <span className="px-3 py-1 text-sm rounded-full" style={{ backgroundColor: app.color + "20", color: app.color }}>
                {app.category}
              </span>
              {app.trend > 10 && (
                <span className="px-2 py-1 text-xs rounded-full bg-[#f59e0b]/20 text-[#f59e0b] flex items-center gap-1">
                  <Flame className="w-3 h-3" /> HOT
                </span>
              )}
            </div>
            <p className="text-gray-400">{app.description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="rounded-xl bg-[#0d0d14] border border-[#1a1a24] p-4">
            <div className="flex items-center gap-2 mb-2 text-gray-500">
              <Users className="w-4 h-4" />
              <span className="text-xs">Users (24h)</span>
            </div>
            <div className="text-xl font-bold">{app.users}</div>
          </div>
          <div className="rounded-xl bg-[#0d0d14] border border-[#1a1a24] p-4">
            <div className="flex items-center gap-2 mb-2 text-gray-500">
              <Activity className="w-4 h-4" />
              <span className="text-xs">Volume (24h)</span>
            </div>
            <div className="text-xl font-bold">{app.volume}</div>
          </div>
          <div className="rounded-xl bg-[#0d0d14] border border-[#1a1a24] p-4">
            <div className="flex items-center gap-2 mb-2 text-gray-500">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs">Trend</span>
            </div>
            <div className={`text-xl font-bold ${app.trend >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
              {app.trend >= 0 ? "+" : ""}{app.trend}%
            </div>
          </div>
          <div className="rounded-xl bg-[#0d0d14] border border-[#1a1a24] p-4">
            <div className="flex items-center gap-2 mb-2 text-gray-500">
              <Wallet className="w-4 h-4" />
              <span className="text-xs">TVL</span>
            </div>
            <div className="text-xl font-bold">{app.tvl}</div>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-2xl bg-[#0d0d14] border border-[#1a1a24] p-6 mb-8">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Weekly Activity</h2>
          <div className="flex items-end gap-2 h-32">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-sm"
                  style={{
                    height: `${(d.value / max) * 100}%`,
                    backgroundColor: app.color,
                    minHeight: "4px"
                  }}
                />
                <span className="text-xs text-gray-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="rounded-xl bg-[#0d0d14] border border-[#1a1a24] p-5">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Transactions (24h)</span>
                <span className="font-mono">{app.txs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Launched</span>
                <span className="font-mono">{app.launched}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Contract</span>
                <button onClick={copyAddress} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1a24] text-sm font-mono hover:bg-[#1a1a24]/50 transition-colors">
                  0x1234...5678
                  {copied ? <Check className="w-3 h-3 text-[#22c55e]" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#0d0d14] border border-[#1a1a24] p-5">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Links</h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24] hover:bg-[#1a1a24]/50 transition-colors">
                <Globe className="w-4 h-4 text-gray-400" />
                <span>Website</span>
                <ExternalLink className="w-3 h-3 text-gray-500 ml-auto" />
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24] hover:bg-[#1a1a24]/50 transition-colors">
<Globe className="w-4 h-4 text-gray-400" />
<span>X (Twitter)</span>
                <ExternalLink className="w-3 h-3 text-gray-500 ml-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}