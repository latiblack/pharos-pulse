'use client';

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
  ChevronRight,
  Radio,
  Circle,
  Clock,
  DollarSign,
  Blocks,
  BarChart3,
  Search,
  Bell,
  Filter,
  TrendingDown
} from "lucide-react";

const stats = [
  { label: "Total Value Locked", value: "$187.5M", change: "+12.4%", positive: true, icon: DollarSign },
  { label: "24h Trading Volume", value: "$892.4M", change: "+8.2%", positive: true, icon: Activity },
  { label: "Active Wallets", value: "143,892", change: "+5.7%", positive: true, icon: Wallet },
  { label: "Smart Contracts", value: "1,247", change: "+23", positive: true, icon: Blocks },
];

const chartData = [
  { day: "Mon", value: 4200 },
  { day: "Tue", value: 5800 },
  { day: "Wed", value: 4500 },
  { day: "Thu", value: 7200 },
  { day: "Fri", value: 8900 },
  { day: "Sat", value: 10200 },
  { day: "Sun", value: 9500 },
];

const topApps = [
  { id: 1, name: "PharosSwap", category: "DeFi", tvl: "$89.2M", volume: "$45.7M", users: "28.5K", trend: 12.5, color: "#3b82f6" },
  { id: 2, name: "ChainQuest", category: "Gaming", tvl: "$34.1M", volume: "$12.3M", users: "45.7K", trend: 28.3, color: "#8b5cf6" },
  { id: 3, name: "NFTVerse", category: "NFT", tvl: "$23.8M", volume: "$23.5M", users: "18.2K", trend: 8.7, color: "#10b981" },
  { id: 4, name: "StakeVault", category: "DeFi", tvl: "$56.2M", volume: "$34.6M", users: "12.3K", trend: 5.2, color: "#f59e0b" },
  { id: 5, name: "BridgeX", category: "Infrastructure", tvl: "$78.5M", volume: "$67.2M", users: "22.1K", trend: 15.8, color: "#06b6d4" },
];

const liveActivity = [
  { type: "Swap", from: "0x7B2d...8C4a", to: "PharosSwap", amount: "45,230 PHA → 2,340 USDC", time: "2s ago", typeColor: "#3b82f6" },
  { type: "Stake", from: "0x9F1a...2B3c", to: "StakeVault", amount: "+5,000 PHA", time: "8s ago", typeColor: "#10b981" },
  { type: "Mint", from: "0x4D5e...6F7a", to: "NFTVerse", amount: "NFT #2847", time: "15s ago", typeColor: "#8b5cf6" },
  { type: "Bridge", from: "0x1A2b...3C4d", to: "BridgeX", amount: "10,000 USDC", time: "22s ago", typeColor: "#06b6d4" },
  { type: "Swap", from: "0x8G9h...0I1j", to: "PharosSwap", amount: "1,200 USDC → 890 PHA", time: "31s ago", typeColor: "#3b82f6" },
];

const categories = [
  { name: "DeFi", apps: 234, color: "#3b82f6" },
  { name: "Gaming", apps: 156, color: "#8b5cf6" },
  { name: "NFTs", apps: 89, color: "#f59e0b" },
  { name: "Social", apps: 67, color: "#10b981" },
  { name: "Infrastructure", apps: 45, color: "#06b6d4" },
];

function MiniChart({ data, color }: { data: { day: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-[3px] h-10">
      {data.map((d, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${((d.value - min) / range) * 100}%`,
            minHeight: "4px",
            background: `linear-gradient(180deg, ${color} 0%, ${color}60 100%)`,
          }}
        />
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen text-white bg-mesh bg-grid">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#020205]/80 backdrop-blur-xl border-b border-[#1a1a26]">
        <div className="flex items-center justify-between h-16 px-8">
          <div>
            <h1 className="text-xl font-semibold">Overview</h1>
            <p className="text-[12px] text-[#71717a]">Welcome back! Here&apos;s what&apos;s happening on Pharos.</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525b]" />
              <input
                type="text"
                placeholder="Search apps, transactions..."
                className="input-field w-64 pl-10 py-2 text-sm"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl bg-[#0c0c14] border border-[#1a1a26] hover:border-[#242432] transition-colors">
              <Bell className="w-4 h-4 text-[#71717a]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#3b82f6] rounded-full" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-[#1a1a26]">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-sm font-semibold">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-8 space-y-8">
        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="stat-card animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#3b82f6]" />
                  </div>
                  <span className={`text-[12px] font-semibold px-2 py-1 rounded-lg ${stat.positive ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-[#ef4444]/10 text-[#ef4444]'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-[13px] text-[#71717a]">{stat.label}</p>
              </div>
            );
          })}
        </section>

        {/* Charts Row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main Chart */}
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Trading Volume</h3>
                <p className="text-[12px] text-[#71717a]">Last 7 days</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-[12px] font-medium rounded-lg bg-[#3b82f6]/10 text-[#3b82f6]">7D</button>
                <button className="px-3 py-1.5 text-[12px] font-medium rounded-lg text-[#71717a] hover:bg-[#1a1a26]">30D</button>
                <button className="px-3 py-1.5 text-[12px] font-medium rounded-lg text-[#71717a] hover:bg-[#1a1a26]">All</button>
              </div>
            </div>
            <div className="flex items-end gap-2 h-48">
              {chartData.map((d, i) => {
                const max = Math.max(...chartData.map(x => x.value));
                const height = (d.value / max) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-[#3b82f6] to-[#3b82f6]/50"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-4 text-[11px] text-[#52525b] font-medium">
              {chartData.map((d, i) => (
                <span key={i}>{d.day}</span>
              ))}
            </div>
          </div>

          {/* Top Gainers */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Top Gainers</h3>
                <p className="text-[12px] text-[#71717a]">Last 24 hours</p>
              </div>
              <TrendingUp className="w-5 h-5 text-[#10b981]" />
            </div>
            <div className="space-y-3">
              {topApps.slice(0, 4).map((app, i) => (
                <div key={app.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#08080e] border border-[#1a1a26]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-bold" style={{ backgroundColor: `${app.color}20`, color: app.color }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium truncate">{app.name}</p>
                    <p className="text-[11px] text-[#52525b]">{app.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-semibold text-[#10b981]">+{app.trend}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Apps & Activity Row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Top Apps Table */}
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Top Applications</h3>
                <p className="text-[12px] text-[#71717a]">By TVL</p>
              </div>
              <Link href="/explorer" className="text-[13px] text-[#3b82f6] hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[11px] text-[#52525b] uppercase tracking-wider border-b border-[#1a1a26]">
                    <th className="text-left pb-4 font-medium">#</th>
                    <th className="text-left pb-4 font-medium">Application</th>
                    <th className="text-right pb-4 font-medium">TVL</th>
                    <th className="text-right pb-4 font-medium">Volume (24h)</th>
                    <th className="text-right pb-4 font-medium">Users</th>
                    <th className="text-right pb-4 font-medium">Trend</th>
                    <th className="text-right pb-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {topApps.map((app, i) => (
                    <tr key={app.id} className="border-b border-[#1a1a26]/50 last:border-0 hover:bg-[#08080e]/50 transition-colors">
                      <td className="py-4">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold" style={{ backgroundColor: `${app.color}15`, color: app.color }}>
                          {i + 1}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: `${app.color}20` }} />
                          <div>
                            <p className="text-[14px] font-medium">{app.name}</p>
                            <p className="text-[11px] text-[#52525b]">{app.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-right text-[14px] font-medium">{app.tvl}</td>
                      <td className="py-4 text-right text-[14px] text-[#a1a1aa]">{app.volume}</td>
                      <td className="py-4 text-right text-[14px] text-[#a1a1aa]">{app.users}</td>
                      <td className="py-4 text-right">
                        <span className="inline-flex items-center gap-1 text-[13px] text-[#10b981]">
                          <ArrowUp className="w-3 h-3" />
                          {app.trend}%
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <MiniChart data={chartData} color={app.color} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Activity */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#10b981] animate-ping opacity-75" />
                </div>
                <h3 className="text-lg font-semibold">Live Activity</h3>
              </div>
              <Link href="/live" className="text-[12px] text-[#3b82f6] hover:underline">View all</Link>
            </div>

            <div className="space-y-2">
              {liveActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#08080e] border border-[#1a1a26] hover:border-[#242432] transition-colors"
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activity.typeColor }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-medium">{activity.type}</span>
                      <span className="text-[11px] text-[#52525b] truncate">{activity.from}</span>
                    </div>
                    <p className="text-[11px] text-[#71717a]">{activity.to}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-medium truncate max-w-[100px]">{activity.amount}</p>
                    <p className="text-[10px] text-[#52525b]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Categories</h3>
              <p className="text-[12px] text-[#71717a]">Apps by category</p>
            </div>
            <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <div
                key={cat.name}
                className="p-4 rounded-2xl bg-[#08080e] border border-[#1a1a26] hover:border-[#242432] transition-all hover:transform hover:-translate-y-1 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                  <BarChart3 className="w-5 h-5" style={{ color: cat.color }} />
                </div>
                <h4 className="text-[15px] font-semibold mb-1 group-hover:text-[#3b82f6] transition-colors">{cat.name}</h4>
                <p className="text-[13px] text-[#71717a]">{cat.apps} apps</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}