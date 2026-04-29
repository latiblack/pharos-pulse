'use client';

import Link from "next/link";
import { 
  TrendingUp, 
  Users, 
  Activity, 
  Wallet, 
  Zap, 
  ArrowUpRight,
  Radio,
  Flame,
  ChevronRight,
  BarChart3,
  Globe,
  Layers,
  Crown,
  DollarSign
} from "lucide-react";

// Chart data
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
  { time: "W1", value: 125000 },
  { time: "W2", value: 145000 },
  { time: "W3", value: 168000 },
  { time: "W4", value: 195000 },
];

const trendingApps = [
  { id: 1, name: "PharosSwap", category: "DeFi", users: "28.5K", volume: "$45.7M", trend: 12.5, color: "#00d4ff" },
  { id: 2, name: "ChainQuest", category: "Gaming", users: "45.7K", volume: "$12.3M", trend: 28.3, color: "#a855f7" },
  { id: 3, name: "NFTVerse", category: "NFT", users: "18.2K", volume: "$23.5M", trend: 8.7, color: "#22c55e" },
  { id: 4, name: "StakeVault", category: "DeFi", users: "12.3K", volume: "$34.6M", trend: 5.2, color: "#f59e0b" },
];

const liveTxs = [
  { type: "swap", from: "0x7B2d...8C4a", to: "PharosSwap", amount: "45,230 PHA", time: "2s ago", color: "#00d4ff" },
  { type: "mint", from: "0x9F1a...2B3c", to: "NFTVerse", amount: "NFT #2847", time: "15s ago", color: "#22c55e" },
  { type: "transfer", from: "0x4D5e...6F7a", to: "0x8G9h...0I1j", amount: "15,000 USDC", time: "32s ago", color: "#f59e0b" },
  { type: "stake", from: "0x1A2b...3C4d", to: "StakeVault", amount: "50,000 PHA", time: "48s ago", color: "#22c55e" },
];

function Sparkline({ data, color }: { data: { time: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  
  return (
    <div className="sparkline">
      {data.map((d, i) => (
        <div
          key={i}
          className="sparkline-bar"
          style={{
            height: `${((d.value - min) / range) * 100}%`,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}

function StatCard({ label, value, change, icon: Icon, color }: { label: string; value: string; change?: number; icon: any; color: string }) {
  return (
    <div className="card card-glow p-5 group">
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15`, boxShadow: `0 0 20px ${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        {change !== undefined && (
          <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: change >= 0 ? '#10b981' : '#ef4444' }}>
            <ArrowUpRight className="w-3 h-3" style={{ transform: change < 0 ? 'rotate(90deg)' : 'rotate(0)' }} />
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="stat-value text-white mb-1">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function BarChart({ data, color }: { data: { time: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map(x => x.value));
  
  return (
    <div className="flex items-end gap-2 h-40">
      {data.map((d, i) => {
        const height = (d.value / max) * 100;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full h-32 flex items-end">
              <div
                className="chart-bar w-full"
                style={{ height: `${height}%` }}
              />
            </div>
            <span className="text-xs text-[var(--text-muted)]">{d.time}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-deep text-white bg-grid bg-glow-top bg-glow-bottom">
      {/* Page Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Dashboard
              </h1>
              <div className="live-indicator px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--pharos-subtle)' }}>
                <div className="live-dot" />
                <span className="text-xs font-medium text-[var(--pharos)]">LIVE</span>
              </div>
            </div>
            <p className="text-[var(--text-muted)]">Monitor the Pharos ecosystem in real-time</p>
          </div>
          
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="card p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--pharos-subtle)] flex items-center justify-center">
                <Zap className="w-4 h-4 text-[var(--pharos)]" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">52</div>
                <div className="text-xs text-[var(--text-muted)]">Apps</div>
              </div>
            </div>
            <div className="card p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--neon-dim)] flex items-center justify-center">
                <Activity className="w-4 h-4 text-[var(--neon)]" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">2.85M</div>
                <div className="text-xs text-[var(--text-muted)]">Txns (24h)</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Live Apps" value="52" icon={Zap} color="#00d4ff" />
          <StatCard label="Transactions (24h)" value="2.85M" change={18.5} icon={Activity} color="#10b981" />
          <StatCard label="Active Wallets" value="143K" change={12.3} icon={Wallet} color="#a855f7" />
          <StatCard label="New Wallets (24h)" value="8.9K" change={8.7} icon={Users} color="#f59e0b" />
        </div>
      </section>

      {/* Charts */}
      <section className="mb-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Transactions Chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[var(--pharos)]" />
                  Transaction Volume
                </h3>
                <p className="text-sm text-[var(--text-muted)]">Last 24 hours</p>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[var(--success)]/10 text-[var(--success)] text-sm font-semibold">
                +18.5%
              </div>
            </div>
            <BarChart data={transactionData} color="#00d4ff" />
          </div>

          {/* Wallet Growth Chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-[var(--neon)]" />
                  Wallet Growth
                </h3>
                <p className="text-sm text-[var(--text-muted)]">Last 30 days</p>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[var(--success)]/10 text-[var(--success)] text-sm font-semibold">
                +12.3%
              </div>
            </div>
            <BarChart data={walletData} color="#a855f7" />
          </div>
        </div>
      </section>

      {/* Activity Sections */}
      <section>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Trending Apps */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--pharos)]" />
                Trending Apps
              </h3>
              <Link href="/explorer" className="text-sm text-[var(--pharos)] hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {trendingApps.map((app, i) => (
                <Link 
                  key={app.id} 
                  href={`/app/${app.name.toLowerCase().replace(' ', '')}`}
                  className="flex items-center gap-4 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--pharos)]/30 transition-all group"
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: `${app.color}20`, color: app.color }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold truncate">{app.name}</span>
                      {app.trend > 10 && <Flame className="w-3 h-3 text-[#f59e0b]" />}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">{app.users} users • {app.volume}</div>
                  </div>
                  <Sparkline data={transactionData} color={app.color} />
                </Link>
              ))}
            </div>
          </div>

          {/* Live Feed */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Radio className="w-5 h-5 text-[var(--neon)] animate-live-dot" />
                Live Feed
              </h3>
              <Link href="/live" className="text-sm text-[var(--neon)] hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-2">
              {liveTxs.map((tx, i) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] transition-all ${i === 0 ? 'border-[var(--pharos)]/30' : ''}`}
                  style={i === 0 ? { backgroundColor: 'var(--pharos-subtle)' } : {}}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: tx.color, boxShadow: `0 0 8px ${tx.color}` }} 
                    />
                    <div>
                      <div className="text-sm font-medium capitalize" style={{ color: tx.color }}>{tx.type}</div>
                      <div className="text-xs text-[var(--text-muted)]">{tx.from} → {tx.to}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-white">{tx.amount}</div>
                    <div className="text-xs text-[var(--text-muted)]">{tx.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ecosystem Overview */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-[var(--pharos)]" />
              Ecosystem
            </h3>
            
            <div className="space-y-4 mb-6">
              {[
                { label: "Total Value Locked", value: "$187.5M", change: "+12.4%", icon: DollarSign, color: "#10b981" },
                { label: "Average TPS", value: "1,247", change: "+8.2%", icon: Activity, color: "#00d4ff" },
                { label: "Smart Contracts", value: "1,247", change: "+23", icon: Layers, color: "#a855f7" },
                { label: "Categories", value: "8", change: "", icon: Crown, color: "#f59e0b" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--border-subtle)] last:border-0">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <span className="text-sm text-[var(--text-secondary)]">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white">{item.value}</span>
                    {item.change && (
                      <span className="ml-2 text-xs text-[var(--success)]">{item.change}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">Categories</div>
              <div className="flex flex-wrap gap-2">
                {["DeFi", "Gaming", "NFT", "Social", "Payments", "RWA", "AI", "Infra"].map(cat => (
                  <span 
                    key={cat} 
                    className="px-3 py-1.5 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
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