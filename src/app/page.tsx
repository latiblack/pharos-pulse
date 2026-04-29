"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, Activity, Wallet, Code, Zap, ExternalLink } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { MOCK_STATS, MOCK_APPS, MOCK_TRANSACTIONS, generateTransactionChartData, generateWalletGrowthData, formatNumber, formatCurrency, timeAgo, CATEGORIES } from "@/lib/mockData";

const transactionData = generateTransactionChartData();
const walletData = generateWalletGrowthData();

function StatsCard({ title, value, change, icon: Icon, trend }: { title: string; value: string; change?: number; icon: any; trend?: "up" | "down" }) {
  return (
    <div className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-pharos-electric/10">
          <Icon className="w-5 h-5 text-pharos-electric" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trend === "up" ? "text-pharos-success" : "text-pharos-danger"}`}>
            {trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {change}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-pharos-muted">{title}</div>
    </div>
  );
}

function AppCard({ app }: { app: any }) {
  return (
    <Link href={`/app/${app.slug}`} className="glass-card rounded-2xl p-5 hover:scale-[1.02] transition-all group block">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-pharos-card flex-shrink-0">
          <img src={app.logo} alt={app.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold truncate">{app.name}</h3>
            {app.trend_percent > 10 && (
              <span className="px-2 py-0.5 text-xs font-medium bg-pharos-success/20 text-pharos-success rounded-full">
                HOT
              </span>
            )}
          </div>
          <p className="text-xs text-pharos-muted mb-2 line-clamp-1">{app.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-1 rounded-md bg-pharos-neon/10 text-pharos-neon">
              {app.category}
            </span>
            <span className={`text-sm font-medium ${app.trend_percent >= 0 ? "text-pharos-success" : "text-pharos-danger"}`}>
              {app.trend_percent >= 0 ? "+" : ""}{app.trend_percent}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function TransactionRow({ tx }: { tx: any }) {
  const typeColors = {
    swap: "text-pharos-electric",
    mint: "text-pharos-success",
    transfer: "text-pharos-warning",
    deploy: "text-pharos-neon",
    vote: "text-pink-400",
    stake: "text-pharos-success",
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-pharos-card/50 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${typeColors[tx.type as keyof typeof typeColors].replace("text-", "bg-")}`} />
        <div className="font-mono text-sm">
          <span className="text-pharos-electric">{tx.type}</span>
          {tx.app && <span className="text-pharos-muted"> on {tx.app}</span>}
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="font-mono text-pharos-muted">{tx.amount.toLocaleString()} {tx.token}</span>
        <span className="text-pharos-muted">{timeAgo(tx.timestamp)}</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [category, setCategory] = useState("All");
  
  const filteredApps = category === "All" 
    ? MOCK_APPS 
    : MOCK_APPS.filter(app => app.category === category);

  const trendingApps = [...MOCK_APPS].sort((a, b) => b.trend_percent - a.trend_percent).slice(0, 5);
  const growingApps = [...MOCK_APPS].sort((a, b) => b.users_today - a.users_today).slice(0, 5);

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pharos-electric/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pharos-neon/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            50+ Apps Live. <span className="text-transparent bg-clip-text bg-gradient-to-r from-pharos-electric to-pharos-neon">One Dashboard.</span>
          </h1>
          <p className="text-xl text-pharos-muted mb-8 max-w-2xl mx-auto">
            Track every major app, wallet trend, and ecosystem signal on Pharos mainnet in real time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/explorer" className="px-8 py-3 bg-pharos-electric text-pharos-bg font-semibold rounded-xl hover:bg-pharos-electric/90 transition-colors glow-electric">
              Explore Ecosystem
            </Link>
            <Link href="/live" className="px-8 py-3 glass-card text-white font-semibold rounded-xl hover:bg-pharos-card transition-colors">
              View Live Activity
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard title="Live Apps" value={MOCK_STATS.live_apps.toString()} icon={Zap} />
            <StatsCard title="Transactions (24h)" value={formatNumber(MOCK_STATS.transactions_24h)} change={18.5} trend="up" icon={Activity} />
            <StatsCard title="Active Wallets" value={formatNumber(MOCK_STATS.active_wallets)} change={12.3} trend="up" icon={Wallet} />
            <StatsCard title="New Wallets (24h)" value={formatNumber(MOCK_STATS.new_wallets_24h)} change={8.7} trend="up" icon={Users} />
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Transactions Over Time</h2>
              <span className="text-sm text-pharos-muted">30 days</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={transactionData}>
                  <defs>
                    <linearGradient id="colorTx" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                  <XAxis dataKey="timestamp" tick={{ fill: "#8888aa", fontSize: 10 }} tickFormatter={(v) => v.slice(5)} />
                  <YAxis tick={{ fill: "#8888aa", fontSize: 10 }} tickFormatter={(v) => formatNumber(v)} />
                  <Tooltip contentStyle={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px" }} />
                  <Area type="monotone" dataKey="value" stroke="#00d4ff" strokeWidth={2} fill="url(#colorTx)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Wallet Growth</h2>
              <span className="text-sm text-pharos-muted">30 days</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={walletData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                  <XAxis dataKey="timestamp" tick={{ fill: "#8888aa", fontSize: 10 }} tickFormatter={(v) => v.slice(5)} />
                  <YAxis tick={{ fill: "#8888aa", fontSize: 10 }} tickFormatter={(v) => formatNumber(v)} />
                  <Tooltip contentStyle={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px" }} />
                  <Line type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Sections */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Trending Apps */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-pharos-electric" />
                Trending Apps
              </h2>
              <Link href="/explorer" className="text-sm text-pharos-electric hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {trendingApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </div>

          {/* Latest Transactions */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-pharos-neon" />
                Live Transactions
              </h2>
              <Link href="/live" className="text-sm text-pharos-neon hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-1">
              {MOCK_TRANSACTIONS.slice(0, 6).map((tx) => (
                <TransactionRow key={tx.id} tx={tx} />
              ))}
            </div>
          </div>

          {/* Ecosystem Stats */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Ecosystem Health</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-pharos-border">
                <span className="text-pharos-muted">TVL Estimate</span>
                <span className="font-semibold">{formatCurrency(MOCK_STATS.tvl_estimate)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-pharos-border">
                <span className="text-pharos-muted">Avg TPS</span>
                <span className="font-semibold">{MOCK_STATS.avg_tps}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-pharos-border">
                <span className="text-pharos-muted">Contracts Deployed</span>
                <span className="font-semibold">{MOCK_STATS.contracts_deployed.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-pharos-muted">Categories</span>
                <span className="font-semibold">{CATEGORIES.length - 1}</span>
              </div>
              
              {/* Category breakdown */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3 text-pharos-muted">By Category</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.slice(1).map((cat) => {
                    const count = MOCK_APPS.filter(a => a.category === cat).length;
                    return (
                      <span key={cat} className="px-3 py-1 text-xs rounded-full bg-pharos-card border border-pharos-border">
                        {cat}: {count}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}