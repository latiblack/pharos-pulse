'use client';

import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Wallet,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Search,
  Bell,
  Settings,
  Users,
  Blocks,
  DollarSign,
  Flame,
  Layers,
  Globe,
  MoreHorizontal
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

const portfolioData = [
  { month: "Jan", value: 125000 },
  { month: "Feb", value: 145000 },
  { month: "Mar", value: 138000 },
  { month: "Apr", value: 172000 },
  { month: "May", value: 195000 },
  { month: "Jun", value: 218000 },
];

const volumeData = [
  { day: "Mon", volume: 4200000, txs: 12400 },
  { day: "Tue", volume: 5800000, txs: 18200 },
  { day: "Wed", volume: 4500000, txs: 14500 },
  { day: "Thu", volume: 7200000, txs: 22100 },
  { day: "Fri", volume: 8900000, txs: 28400 },
  { day: "Sat", volume: 10200000, txs: 32600 },
  { day: "Sun", volume: 9500000, txs: 29800 },
];

const categoryData = [
  { name: "DeFi", value: 35, color: "#3b82f6" },
  { name: "Gaming", value: 25, color: "#8b5cf6" },
  { name: "NFTs", value: 18, color: "#f59e0b" },
  { name: "Social", value: 12, color: "#10b981" },
  { name: "Infra", value: 10, color: "#06b6d4" },
];

const topProtocols = [
  { rank: 1, name: "PharosSwap", category: "DEX", tvl: "$89.2M", change: 5.2, volume: "$45.7M", color: "#3b82f6" },
  { rank: 2, name: "LendFlow", category: "Lending", tvl: "$67.4M", change: 12.8, volume: "$23.1M", color: "#8b5cf6" },
  { rank: 3, name: "ChainQuest", category: "Gaming", tvl: "$45.8M", change: -2.1, volume: "$18.9M", color: "#f59e0b" },
  { rank: 4, name: "StakeVault", category: "Staking", tvl: "$34.2M", change: 8.4, volume: "$12.4M", color: "#10b981" },
  { rank: 5, name: "BridgeX", category: "Bridge", tvl: "$28.9M", change: 15.2, volume: "$67.2M", color: "#06b6d4" },
];

const recentTransactions = [
  { type: "swap", from: "0x7a3f...2d8c", to: "PharosSwap", amount: "12,450 USDC → 8,230 PHA", time: "2s ago", status: "completed" },
  { type: "stake", from: "0x9e2b...4a1f", to: "LendFlow", amount: "+50,000 PHA", time: "15s ago", status: "completed" },
  { type: "bridge", from: "0x3c8d...7b2e", to: "BridgeX", amount: "5,000 USDC", time: "32s ago", status: "completed" },
  { type: "mint", from: "0x1f4a...9c3d", to: "NFTVerse", amount: "Lucky Cat #284", time: "48s ago", status: "completed" },
  { type: "swap", from: "0x6b2c...8e1a", to: "PharosSwap", amount: "2,100 PHA → 3,450 USDC", time: "1m ago", status: "completed" },
];

const ecosystemStats = [
  { label: "Total Value Locked", value: "$487.2M", change: "+12.4%", positive: true },
  { label: "24h Trading Volume", value: "$89.2M", change: "+8.7%", positive: true },
  { label: "Active Addresses", value: "143,892", change: "+5.2%", positive: true },
  { label: "Avg. Block Time", value: "1.2s", change: "-0.3s", positive: true },
  { label: "Total Transactions", value: "24.8M", change: "+2.4M", positive: true },
  { label: "Gas Price", value: "0.002 Gwei", change: "-15%", positive: true },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0a0a0f]/90 border-b border-[#1a1a28]">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-8">
            <h1 className="text-lg font-semibold text-white">Dashboard</h1>
            <nav className="hidden md:flex items-center gap-1">
              {["Overview", "Portfolio", "Analytics", "Markets"].map((item, i) => (
                <button
                  key={item}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    i === 0 ? "bg-[#1a1a28] text-white" : "text-[#71717a] hover:text-white hover:bg-[#1a1a28]/50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525b]" />
              <input
                type="text"
                placeholder="Search..."
                className="w-48 h-9 pl-9 pr-4 text-sm bg-[#14141f] border border-[#1a1a28] rounded-lg focus:outline-none focus:border-[#3b82f6] text-white placeholder-[#52525b]"
              />
            </div>
            <button className="relative w-9 h-9 flex items-center justify-center bg-[#14141f] border border-[#1a1a28] rounded-lg hover:border-[#3b82f6]/50 transition-colors">
              <Bell className="w-4 h-4 text-[#71717a]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#3b82f6] rounded-full" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center bg-[#14141f] border border-[#1a1a28] rounded-lg hover:border-[#3b82f6]/50 transition-colors">
              <Settings className="w-4 h-4 text-[#71717a]" />
            </button>
            <div className="w-9 h-9 ml-2 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-sm font-semibold">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Portfolio Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Portfolio Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#1a1a28] to-[#14141f] border border-[#1a1a28] rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b82f6]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8b5cf6]/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-[#71717a] mb-1">Total Portfolio Value</p>
                  <h2 className="text-4xl font-bold text-white">$2,847,392.00</h2>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#10b981]/10 rounded-full">
                  <TrendingUp className="w-4 h-4 text-[#10b981]" />
                  <span className="text-sm font-semibold text-[#10b981]">+12.5%</span>
                </div>
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={portfolioData}>
                    <defs>
                      <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="url(#portfolioGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#1a1a28]">
                <div>
                  <p className="text-xs text-[#52525b]">24h Change</p>
                  <p className="text-lg font-semibold text-[#10b981]">+$324,892</p>
                </div>
                <div>
                  <p className="text-xs text-[#52525b]">Best Performer</p>
                  <p className="text-lg font-semibold text-white">PharosSwap</p>
                </div>
                <div>
                  <p className="text-xs text-[#52525b]">Yield APY</p>
                  <p className="text-lg font-semibold text-white">8.4%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            {/* Ecosystem Stats */}
            <div className="bg-[#14141f] border border-[#1a1a28] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[#71717a] uppercase tracking-wider mb-4">Ecosystem</h3>
              <div className="space-y-4">
                {ecosystemStats.slice(0, 3).map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-[#a1a1aa]">{stat.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{stat.value}</span>
                      <span className={`text-xs ${stat.positive ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-[#14141f] border border-[#1a1a28] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[#71717a] uppercase tracking-wider mb-4">Distribution</h3>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        innerRadius={28}
                        outerRadius={40}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {categoryData.map((cat, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className="text-xs text-[#a1a1aa]">{cat.name}</span>
                      </div>
                      <span className="text-xs font-medium text-white">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Volume Chart & Top Protocols */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Volume Chart */}
          <div className="lg:col-span-2 bg-[#14141f] border border-[#1a1a28] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Trading Volume</h3>
                <p className="text-sm text-[#52525b]">Last 7 days</p>
              </div>
              <div className="flex items-center gap-2">
                {["24H", "7D", "30D", "1Y"].map((period) => (
                  <button
                    key={period}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      period === "7D"
                        ? "bg-[#3b82f6] text-white"
                        : "text-[#71717a] hover:text-white hover:bg-[#1a1a28]"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a28" vertical={false} />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#52525b", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#52525b", fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a28",
                      border: "1px solid #1a1a28",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value) => [`$${(Number(value) / 1000000).toFixed(2)}M`, "Volume"]}
                  />
                  <Bar dataKey="volume" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Protocols */}
          <div className="bg-[#14141f] border border-[#1a1a28] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Top Protocols</h3>
                <p className="text-sm text-[#52525b]">By TVL</p>
              </div>
              <Link href="/rankings" className="text-sm text-[#3b82f6] hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {topProtocols.map((protocol) => (
                <div
                  key={protocol.rank}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#0a0a0f] border border-[#1a1a28] hover:border-[#3b82f6]/30 transition-colors cursor-pointer"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: `${protocol.color}15`, color: protocol.color }}
                  >
                    {protocol.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white truncate">{protocol.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a28] text-[#52525b]">
                        {protocol.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#52525b]">Vol: {protocol.volume}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{protocol.tvl}</p>
                    <p className={`text-xs ${protocol.change >= 0 ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                      {protocol.change >= 0 ? "+" : ""}{protocol.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transactions & Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-[#14141f] border border-[#1a1a28] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#10b981] animate-ping opacity-75" />
                </div>
                <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
              </div>
              <Link href="/live" className="text-sm text-[#3b82f6] hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-2">
              {recentTransactions.map((tx, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-xl bg-[#0a0a0f] border border-[#1a1a28] hover:border-[#3b82f6]/20 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    tx.type === "swap" ? "bg-[#3b82f6]/10" :
                    tx.type === "stake" ? "bg-[#10b981]/10" :
                    tx.type === "bridge" ? "bg-[#06b6d4]/10" :
                    "bg-[#8b5cf6]/10"
                  }`}>
                    {tx.type === "swap" && <ArrowUpRight className="w-4 h-4 text-[#3b82f6]" />}
                    {tx.type === "stake" && <TrendingUp className="w-4 h-4 text-[#10b981]" />}
                    {tx.type === "bridge" && <Globe className="w-4 h-4 text-[#06b6d4]" />}
                    {tx.type === "mint" && <Layers className="w-4 h-4 text-[#8b5cf6]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white capitalize">{tx.type}</span>
                      <span className="text-xs text-[#52525b]">{tx.from}</span>
                    </div>
                    <p className="text-xs text-[#71717a]">{tx.to}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-white truncate max-w-[120px]">{tx.amount}</p>
                    <p className="text-[10px] text-[#52525b]">{tx.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Stats */}
          <div className="bg-[#14141f] border border-[#1a1a28] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Market Overview</h3>
                <p className="text-sm text-[#52525b]">Key metrics</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Total Value Locked", value: "$487.2M", change: "+12.4%", icon: DollarSign, color: "#3b82f6" },
                { label: "24h Volume", value: "$89.2M", change: "+8.7%", icon: Activity, color: "#8b5cf6" },
                { label: "Active Wallets", value: "143.9K", change: "+5.2%", icon: Users, color: "#10b981" },
                { label: "Smart Contracts", value: "1,247", change: "+23", icon: Blocks, color: "#f59e0b" },
                { label: "Gas Price", value: "0.002 Gwei", change: "-15%", icon: Zap, color: "#06b6d4" },
                { label: "Categories", value: "8", change: "0", icon: Layers, color: "#ec4899" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="p-4 rounded-xl bg-[#0a0a0f] border border-[#1a1a28]">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4" style={{ color: stat.color }} />
                      <span className="text-xs text-[#71717a]">{stat.label}</span>
                    </div>
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className={`text-xs ${stat.change.startsWith("+") || stat.change.startsWith("-") && !stat.change.startsWith("-15") ? "text-[#10b981]" : "text-[#71717a]"}`}>
                      {stat.change}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}