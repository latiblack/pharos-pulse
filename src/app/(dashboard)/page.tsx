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
  Circle
} from "lucide-react";

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

const trendingApps = [
  { id: 1, name: "PharosSwap", category: "DeFi", users: "28.5K", volume: "$45.7M", trend: 12.5, color: "#0007b8" },
  { id: 2, name: "ChainQuest", category: "Gaming", users: "45.7K", volume: "$12.3M", trend: 28.3, color: "#a855f7" },
  { id: 3, name: "NFTVerse", category: "NFT", users: "18.2K", volume: "$23.5M", trend: 8.7, color: "#10b981" },
  { id: 4, name: "StakeVault", category: "DeFi", users: "12.3K", volume: "$34.6M", trend: 5.2, color: "#f59e0b" },
];

const liveTxs = [
  { type: "swap", from: "0x7B2d...8C4a", to: "PharosSwap", amount: "45,230 PHA", time: "2s ago", color: "#0007b8" },
  { type: "mint", from: "0x9F1a...2B3c", to: "NFTVerse", amount: "NFT #2847", time: "15s ago", color: "#10b981" },
  { type: "transfer", from: "0x4D5e...6F7a", to: "0x8G9h...0I1j", amount: "15,000 USDC", time: "32s ago", color: "#f59e0b" },
  { type: "stake", from: "0x1A2b...3C4d", to: "StakeVault", amount: "50,000 PHA", time: "48s ago", color: "#10b981" },
];

function Sparkline({ data, color }: { data: { time: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-[2px] h-8 w-12">
      {data.map((d, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm chart-bar"
          style={{
            height: `${((d.value - min) / range) * 100}%`,
            backgroundColor: color,
            minHeight: "2px",
            opacity: 0.8
          }}
        />
      ))}
    </div>
  );
}

function StatCard({ label, value, change, icon: Icon }: { label: string; value: string; change?: number; icon: any }) {
  return (
    <div className="card p-5 hover:border-[#1c1c24] transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-[#0d0d13] border border-[#141419] flex items-center justify-center">
          <Icon className="w-[18px] h-[18px] text-[#0007b8]" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-[12px] font-medium ${change >= 0 ? "text-[#10b981]" : "text-[#ef4444]"}`}>
            {change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-[24px] font-semibold text-white tracking-tight">{value}</div>
      <div className="text-[12px] text-[#52525b] mt-1">{label}</div>
    </div>
  );
}

function BarChart({ data, color, labels }: { data: { time: string; value: number }[]; color: string; labels?: boolean }) {
  const max = Math.max(...data.map(x => x.value));

  return (
    <div>
      <div className="flex items-end gap-1 h-32">
        {data.map((d, i) => {
          const height = (d.value / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-t-sm chart-bar"
                style={{
                  height: `${height}%`,
                  minHeight: "4px",
                  background: `linear-gradient(180deg, ${color} 0%, ${color}80 100%)`,
                }}
              />
            </div>
          );
        })}
      </div>
      {labels && (
        <div className="flex justify-between mt-3 text-[11px] text-[#52525b] font-medium">
          {data.map((d, i) => (
            <span key={i}>{d.time}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen text-white bg-grid radial-glow-top radial-glow-bottom">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-semibold tracking-tight">Dashboard</h1>
            <p className="text-[#71717a] mt-1 text-[14px]">Monitor the Pharos ecosystem in real-time</p>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0a0a0f] border border-[#141419]">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-[#10b981]" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#10b981] animate-ping opacity-75" />
            </div>
            <span className="text-[13px] font-medium text-white">Live</span>
            <span className="text-[#52525b]">•</span>
            <span className="text-[13px] text-[#71717a]">52 apps</span>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Live Apps" value="52" icon={Zap} />
          <StatCard label="Transactions (24h)" value="2.85M" change={18.5} icon={Activity} />
          <StatCard label="Active Wallets" value="143K" change={12.3} icon={Wallet} />
          <StatCard label="New Wallets (24h)" value="8.9K" change={8.7} icon={Users} />
        </div>
      </section>

      {/* Charts */}
      <section className="mb-8">
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Transactions Chart */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[15px] font-semibold">Transaction Volume</h3>
                <p className="text-[12px] text-[#52525b] mt-0.5">Last 24 hours</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0007b8]" />
                <span className="text-[13px] text-[#a1a1aa]">+18.5%</span>
              </div>
            </div>
            <BarChart data={transactionData} color="#0007b8" labels />
          </div>

          {/* Wallet Growth Chart */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[15px] font-semibold">Wallet Growth</h3>
                <p className="text-[12px] text-[#52525b] mt-0.5">Last 30 days</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#a855f7]" />
                <span className="text-[13px] text-[#a1a1aa]">+12.3%</span>
              </div>
            </div>
            <BarChart data={walletData} color="#a855f7" labels />
          </div>
        </div>
      </section>

      {/* Activity & Trending */}
      <section>
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Trending Apps */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[15px] font-semibold flex items-center gap-2">
                <TrendingUp className="w-[16px] h-[16px] text-[#0007b8]" />
                Trending Apps
              </h3>
              <Link href="/explorer" className="text-[12px] text-[#0007b8] hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2">
              {trendingApps.map((app, i) => (
                <Link
                  key={app.id}
                  href={`/app/${app.name.toLowerCase().replace(' ', '')}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#06060a] border border-[#141419] hover:border-[#1c1c24] transition-all group"
                >
                  <div 
                    className="w-7 h-7 rounded-md flex items-center justify-center text-[12px] font-semibold"
                    style={{ backgroundColor: app.color + '15', color: app.color }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-medium text-white truncate">{app.name}</span>
                      {app.trend > 10 && <Flame className="w-3 h-3 text-[#f59e0b] flex-shrink-0" />}
                    </div>
                    <div className="text-[11px] text-[#52525b]">{app.users} users • {app.volume}</div>
                  </div>
                  <Sparkline data={transactionData} color={app.color} />
                </Link>
              ))}
            </div>
          </div>

          {/* Live Feed */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[15px] font-semibold flex items-center gap-2">
                <Radio className="w-[16px] h-[16px] text-[#a855f7] animate-live-pulse" />
                Live Feed
              </h3>
              <Link href="/live" className="text-[12px] text-[#a855f7] hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2 font-mono text-[13px]">
              {liveTxs.map((tx, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg bg-[#06060a] border transition-colors ${
                    i === 0 
                      ? 'border-[#0007b830] bg-[#0007b808]' 
                      : 'border-[#141419]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Circle className="w-1.5 h-1.5 fill-current" style={{ color: tx.color }} />
                    <span className="text-white capitalize">{tx.type}</span>
                    <span className="text-[#52525b] text-[11px] hidden sm:inline">{tx.from}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[12px] text-[#a1a1aa]">{tx.amount}</div>
                    <div className="text-[10px] text-[#52525b]">{tx.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ecosystem Stats */}
          <div className="card p-5">
            <h3 className="text-[15px] font-semibold mb-5">Ecosystem Overview</h3>

            <div className="space-y-0 mb-5">
              {[
                { label: "Total Value Locked", value: "$187.5M", change: "+12.4%" },
                { label: "Average TPS", value: "1,247", change: "+8.2%" },
                { label: "Smart Contracts", value: "1,247", change: "+23" },
                { label: "Categories", value: "8", change: "" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#141419] last:border-0">
                  <span className="text-[13px] text-[#71717a]">{item.label}</span>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-[14px] font-medium text-white">{item.value}</span>
                    {item.change && (
                      <span className="text-[11px] text-[#10b981]">{item.change}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div>
              <div className="text-[12px] text-[#52525b] mb-3">Categories</div>
              <div className="flex flex-wrap gap-2">
                {["DeFi", "Gaming", "NFT", "Social", "Payments", "RWA", "AI", "Infra"].map(cat => (
                  <span 
                    key={cat} 
                    className="px-2.5 py-1.5 text-[11px] rounded-md bg-[#06060a] border border-[#141419] text-[#71717a]"
                  >
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