"use client";

import { TrendingUp, TrendingDown, Users, Zap, Activity, PieChart, ArrowUpRight, Flame } from "lucide-react";
import { MOCK_APPS, MOCK_STATS, formatNumber, formatCurrency, generateTransactionChartData } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const txData = generateTransactionChartData(14);

export default function InsightsPage() {
  // Calculate insights from data
  const categoryStats = MOCK_APPS.reduce((acc, app) => {
    acc[app.category] = (acc[app.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topGainer = [...MOCK_APPS].sort((a, b) => b.trend_percent - a.trend_percent)[0];
  const topVolume = [...MOCK_APPS].sort((a, b) => b.volume_24h - a.volume_24h)[0];
  const totalUsers = MOCK_APPS.reduce((sum, app) => sum + app.users_today, 0);

  const categoryData = Object.entries(categoryStats).map(([name, value]) => ({
    name,
    value,
    fill: categoryColors[name] || "#8888aa",
  }));

  const weeklyData = txData.slice(-7).map(d => ({
    day: new Date(d.timestamp).toLocaleDateString("en-US", { weekday: "short" }),
    tx: d.value,
  }));

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <PieChart className="w-8 h-8 text-pharos-neon" />
            Insights
          </h1>
          <p className="text-pharos-muted">Auto-generated ecosystem intelligence</p>
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <InsightCard
            title="Hot Sector"
            value="AI & Gaming"
            description="AIOracle + ChainQuest driving 73% of new user growth"
            icon={Zap}
            color="text-pharos-electric"
          />
          <InsightCard
            title="Top Gainer"
            value={topGainer.name}
            description={`+${topGainer.trend_percent}% growth this week`}
            icon={Flame}
            color="text-pharos-success"
            action={`${formatNumber(topGainer.users_today)} daily users`}
          />
          <InsightCard
            title="Volume Leader"
            value={topVolume.name}
            description={`${formatCurrency(topVolume.volume_24h)} in 24h`}
            icon={Activity}
            color="text-pharos-neon"
          />
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Weekly Activity */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                  <XAxis dataKey="day" tick={{ fill: "#8888aa", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#8888aa", fontSize: 12 }} tickFormatter={(v) => formatNumber(v)} />
                  <Tooltip contentStyle={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px" }} />
                  <Bar dataKey="tx" fill="#00d4ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                  <XAxis type="number" tick={{ fill: "#8888aa", fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" tick={{ fill: "#8888aa", fontSize: 12 }} width={80} />
                  <Tooltip contentStyle={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px" }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Trends Section */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">Trending Narratives</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <NarrativeCard
              title="DeFi Summer Returns"
              description="Total volume up 45% as yield opportunities attract institutional capital"
              trend="up"
              metrics={["TVL +$50M", "Volume +45%", "New protocols +8"]}
            />
            <NarrativeCard
              title="Gaming Surge"
              description="Play-to-earn activity spikes with new seasonal rewards programs"
              trend="up"
              metrics={["DAU +28%", "Session time +35%", "NFT volume +52%"]}
            />
            <NarrativeCard
              title="Infrastructure Growth"
              description="Cross-chain bridges seeing record usage as multi-chain activity increases"
              trend="up"
              metrics={["Bridge volume +67%", "New chains +5", "TVL +$23M"]}
            />
            <NarrativeCard
              title="SocialFi Momentum"
              description="Decentralized social platforms gaining traction with creator economy tools"
              trend="up"
              metrics={["Users +15%", "Content +89%", "Engagement +42%"]}
            />
          </div>
        </div>

        {/* Retention Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <StatCard label="Total Ecosystem Users" value={formatNumber(totalUsers)} />
          <StatCard label="Avg Session Duration" value="12.4m" />
          <StatCard label="7-Day Retention" value="34.2%" />
          <StatCard label="30-Day Retention" value="18.7%" />
        </div>
      </div>
    </div>
  );
}

const categoryColors: Record<string, string> = {
  DeFi: "#00d4ff",
  Gaming: "#a855f7",
  NFT: "#22c55e",
  Infrastructure: "#f59e0b",
  Social: "#ec4899",
  Payments: "#06b6d4",
  RWA: "#14b8a6",
  AI: "#8b5cf6",
};

function InsightCard({ title, value, description, icon: Icon, color, action }: any) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-pharos-muted">{title}</span>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className={`text-2xl font-bold mb-1 ${color}`}>{value}</div>
      <p className="text-sm text-pharos-muted mb-2">{description}</p>
      {action && <span className="text-xs text-pharos-muted bg-pharos-card px-2 py-1 rounded">{action}</span>}
    </div>
  );
}

function NarrativeCard({ title, description, trend, metrics }: { title: string; description: string; trend: string; metrics: string[] }) {
  return (
    <div className="p-4 rounded-xl bg-pharos-card/50 border border-pharos-border">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold">{title}</h3>
        {trend === "up" ? (
          <TrendingUp className="w-4 h-4 text-pharos-success" />
        ) : (
          <TrendingDown className="w-4 h-4 text-pharos-danger" />
        )}
      </div>
      <p className="text-sm text-pharos-muted mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {metrics.map((m, i) => (
          <span key={i} className="text-xs px-2 py-1 rounded bg-pharos-bg text-pharos-electric">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card rounded-xl p-4 text-center">
      <div className="text-xl font-bold text-pharos-electric">{value}</div>
      <div className="text-xs text-pharos-muted">{label}</div>
    </div>
  );
}