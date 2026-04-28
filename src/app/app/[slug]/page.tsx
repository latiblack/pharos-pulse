"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Twitter, Globe, TrendingUp, Users, Activity, Wallet, Flame, Copy, Check } from "lucide-react";
import { useState } from "react";
import { MOCK_APPS, formatNumber, formatCurrency, generateTransactionChartData, generateWalletGrowthData } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export default function AppDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const app = MOCK_APPS.find((a) => a.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!app) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">App Not Found</h1>
          <Link href="/explorer" className="text-pharos-electric hover:underline">
            Back to Explorer
          </Link>
        </div>
      </div>
    );
  }

  const txChartData = generateTransactionChartData(14);
  const walletChartData = generateWalletGrowthData(14);

  const copyAddress = () => {
    navigator.clipboard.writeText(app.contract_address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Banner */}
      <div className="h-48 md:h-64 relative">
        <img src={app.banner} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pharos-bg via-pharos-bg/50 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-24 relative z-10">
        {/* Back button */}
        <Link href="/explorer" className="inline-flex items-center gap-2 text-pharos-muted hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Explorer
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
          <img src={app.logo} alt={app.name} className="w-24 h-24 rounded-2xl border-4 border-pharos-bg" />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{app.name}</h1>
              <span className="px-3 py-1 text-sm rounded-full bg-pharos-neon/10 text-pharos-neon">
                {app.category}
              </span>
              {app.trend_percent > 10 && (
                <span className="px-3 py-1 text-sm rounded-full bg-pharos-success/10 text-pharos-success flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  HOT
                </span>
              )}
            </div>
            <p className="text-pharos-muted mb-4">{app.description}</p>
            
            {/* Contract Address */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pharos-card border border-pharos-border font-mono text-sm">
                <span className="text-pharos-muted">Contract:</span>
                <span className="text-white">{app.contract_address}</span>
                <button onClick={copyAddress} className="text-pharos-muted hover:text-white">
                  {copied ? <Check className="w-4 h-4 text-pharos-success" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={app.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pharos-electric/10 text-pharos-electric hover:bg-pharos-electric/20 transition-colors"
              >
                <Globe className="w-4 h-4" />
                Website
              </a>
              {app.twitter && (
                <a
                  href={`https://twitter.com/${app.twitter.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pharos-card border border-pharos-border hover:border-pharos-electric transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  {app.twitter}
                </a>
              )}
            </div>
          </div>

          {/* Rank Badge */}
          <div className="glass-card rounded-2xl p-6 text-center min-w-[140px]">
            <div className="text-sm text-pharos-muted mb-1">Rank</div>
            <div className="text-4xl font-bold text-pharos-electric">#{app.rank}</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2 text-pharos-muted">
              <Users className="w-4 h-4" />
              Users (24h)
            </div>
            <div className="text-2xl font-bold">{formatNumber(app.users_today)}</div>
          </div>
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2 text-pharos-muted">
              <Activity className="w-4 h-4" />
              Volume (24h)
            </div>
            <div className="text-2xl font-bold">{formatCurrency(app.volume_24h)}</div>
          </div>
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2 text-pharos-muted">
              <TrendingUp className="w-4 h-4" />
              Trend
            </div>
            <div className={`text-2xl font-bold ${app.trend_percent >= 0 ? "text-pharos-success" : "text-pharos-danger"}`}>
              {app.trend_percent >= 0 ? "+" : ""}{app.trend_percent}%
            </div>
          </div>
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2 text-pharos-muted">
              <Wallet className="w-4 h-4" />
              TVL
            </div>
            <div className="text-2xl font-bold">{formatCurrency(app.tvl)}</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Transaction Volume</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={txChartData}>
                  <defs>
                    <linearGradient id="colorAppTx" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                  <XAxis dataKey="timestamp" tick={{ fill: "#8888aa", fontSize: 10 }} tickFormatter={(v) => v.slice(5)} />
                  <YAxis tick={{ fill: "#8888aa", fontSize: 10 }} tickFormatter={(v) => formatNumber(v)} />
                  <Tooltip contentStyle={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px" }} />
                  <Area type="monotone" dataKey="value" stroke="#00d4ff" strokeWidth={2} fill="url(#colorAppTx)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">User Growth</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={walletChartData}>
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

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">7-Day Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-pharos-border">
                <span className="text-pharos-muted">Total Users</span>
                <span className="font-semibold">{formatNumber(app.users_7d)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-pharos-border">
                <span className="text-pharos-muted">Total Volume</span>
                <span className="font-semibold">{formatCurrency(app.volume_7d)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-pharos-border">
                <span className="text-pharos-muted">Transactions (24h)</span>
                <span className="font-semibold">{formatNumber(app.tx_count_24h)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-pharos-muted">Launched</span>
                <span className="font-semibold">{new Date(app.launched).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Category Ranking</h2>
            <div className="space-y-3">
              {MOCK_APPS.filter((a) => a.category === app.category)
                .sort((a, b) => a.rank - b.rank)
                .map((a, index) => (
                  <div
                    key={a.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      a.id === app.id ? "bg-pharos-electric/10 border border-pharos-electric/30" : "bg-pharos-card/50"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-pharos-card flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <img src={a.logo} alt={a.name} className="w-8 h-8 rounded-lg" />
                    <span className="flex-1 font-medium">{a.name}</span>
                    <span className="text-pharos-muted">{formatNumber(a.users_today)}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}