// Mock ecosystem data for Pharos Pulse
// Structured for easy Goldsky integration later

export interface App {
  id: string;
  name: string;
  slug: string;
  category: "DeFi" | "Gaming" | "NFT" | "Infrastructure" | "Social" | "Payments" | "RWA" | "AI";
  description: string;
  logo: string;
  banner: string;
  website: string;
  twitter?: string;
  contract_address: string;
  users_today: number;
  users_7d: number;
  volume_24h: number;
  volume_7d: number;
  tx_count_24h: number;
  trend_percent: number;
  tvl: number;
  rank: number;
  launched: string;
}

export interface Transaction {
  id: string;
  hash: string;
  type: "swap" | "mint" | "transfer" | "deploy" | "vote" | "stake";
  from: string;
  to: string;
  amount: number;
  token: string;
  app?: string;
  timestamp: Date;
}

export interface Stats {
  live_apps: number;
  transactions_24h: number;
  active_wallets: number;
  new_wallets_24h: number;
  contracts_deployed: number;
  tvl_estimate: number;
  avg_tps: number;
}

export interface ChartDataPoint {
  timestamp: string;
  value: number;
}

export const CATEGORIES = [
  "All",
  "DeFi",
  "Gaming",
  "NFT",
  "Infrastructure",
  "Social",
  "Payments",
  "RWA",
  "AI",
] as const;

export const MOCK_STATS: Stats = {
  live_apps: 52,
  transactions_24h: 2847391,
  active_wallets: 142857,
  new_wallets_24h: 8932,
  contracts_deployed: 1247,
  tvl_estimate: 187500000,
  avg_tps: 1247,
};

export const MOCK_APPS: App[] = [
  {
    id: "1",
    name: "PharosSwap",
    slug: "pharosswap",
    category: "DeFi",
    description: "Leading DEX on Pharos with deep liquidity and low fees",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=pharosswap&backgroundColor=00d4ff",
    banner: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
    website: "https://pharosswap.pharos",
    twitter: "@pharosswap",
    contract_address: "0x1234...5678",
    users_today: 28450,
    users_7d: 156789,
    volume_24h: 45678900,
    volume_7d: 298765432,
    tx_count_24h: 89234,
    trend_percent: 12.5,
    tvl: 89000000,
    rank: 1,
    launched: "2026-01-15",
  },
  {
    id: "2",
    name: "ChainQuest",
    slug: "chainquest",
    category: "Gaming",
    description: "Play-to-earn RPG adventure on Pharos blockchain",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=chainquest&backgroundColor=a855f7",
    banner: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800",
    website: "https://chainquest.pharos",
    twitter: "@chainquest",
    contract_address: "0xabcd...ef01",
    users_today: 45678,
    users_7d: 234567,
    volume_24h: 12345678,
    volume_7d: 89012345,
    tx_count_24h: 156789,
    trend_percent: 28.3,
    tvl: 34000000,
    rank: 2,
    launched: "2026-01-20",
  },
  {
    id: "3",
    name: "NFTVerse",
    slug: "nftverse",
    category: "NFT",
    description: "Premium NFT marketplace with generative art collections",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=nftverse&backgroundColor=22c55e",
    banner: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800",
    website: "https://nftverse.pharos",
    twitter: "@nftverse",
    contract_address: "0x9876...5432",
    users_today: 18234,
    users_7d: 98765,
    volume_24h: 23456789,
    volume_7d: 178901234,
    tx_count_24h: 45678,
    trend_percent: 8.7,
    tvl: 28000000,
    rank: 3,
    launched: "2026-01-18",
  },
  {
    id: "4",
    name: "StakeVault",
    slug: "stakevault",
    category: "DeFi",
    description: "Liquid staking protocol with auto-compounding",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=stakevault&backgroundColor=f59e0b",
    banner: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800",
    website: "https://stakevault.pharos",
    contract_address: "0xdef0...1234",
    users_today: 12345,
    users_7d: 67890,
    volume_24h: 34567890,
    volume_7d: 234567890,
    tx_count_24h: 23456,
    trend_percent: 5.2,
    tvl: 156000000,
    rank: 4,
    launched: "2026-01-10",
  },
  {
    id: "5",
    name: "SocialFi Hub",
    slug: "socialfi",
    category: "Social",
    description: "Decentralized social platform with tokenized content",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=socialfi&backgroundColor=ec4899",
    banner: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    website: "https://socialfi.pharos",
    twitter: "@socialfihub",
    contract_address: "0x5678...90ab",
    users_today: 34567,
    users_7d: 189234,
    volume_24h: 567890,
    volume_7d: 3456789,
    tx_count_24h: 67890,
    trend_percent: 15.8,
    tvl: 8900000,
    rank: 5,
    launched: "2026-01-25",
  },
  {
    id: "6",
    name: "PharosPay",
    slug: "pharospay",
    category: "Payments",
    description: "Fast, low-cost payments for merchants and consumers",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=pharospay&backgroundColor=06b6d4",
    banner: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    website: "https://pharospay.pharos",
    contract_address: "0x2468...ace0",
    users_today: 28901,
    users_7d: 145678,
    volume_24h: 78901234,
    volume_7d: 567890123,
    tx_count_24h: 123456,
    trend_percent: 22.1,
    tvl: 12000000,
    rank: 6,
    launched: "2026-01-12",
  },
  {
    id: "7",
    name: "RealToken",
    slug: "realtoken",
    category: "RWA",
    description: "Tokenized real estate and physical assets",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=realtoken&backgroundColor=14b8a6",
    banner: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    website: "https://realtoken.pharos",
    twitter: "@realtoken",
    contract_address: "0x1357...9bcd",
    users_today: 4523,
    users_7d: 23456,
    volume_24h: 12345678,
    volume_7d: 89012345,
    tx_count_24h: 8901,
    trend_percent: 3.4,
    tvl: 45000000,
    rank: 7,
    launched: "2026-02-01",
  },
  {
    id: "8",
    name: "AIOracle",
    slug: "aioracle",
    category: "AI",
    description: "Decentralized AI inference marketplace",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=aioracle&backgroundColor=8b5cf6",
    banner: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    website: "https://aioracle.pharos",
    twitter: "@aioracle",
    contract_address: "0xfedc...ba98",
    users_today: 8901,
    users_7d: 45678,
    volume_24h: 2345678,
    volume_7d: 15678901,
    tx_count_24h: 12345,
    trend_percent: 45.2,
    tvl: 12000000,
    rank: 8,
    launched: "2026-02-05",
  },
  {
    id: "9",
    name: "BridgeX",
    slug: "bridgex",
    category: "Infrastructure",
    description: "Cross-chain bridge with instant finality",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=bridgex&backgroundColor=ef4444",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    website: "https://bridgex.pharos",
    contract_address: "0x0fed...cba9",
    users_today: 15678,
    users_7d: 89012,
    volume_24h: 156789012,
    volume_7d: 987654321,
    tx_count_24h: 34567,
    trend_percent: 18.9,
    tvl: 78000000,
    rank: 9,
    launched: "2026-01-08",
  },
  {
    id: "10",
    name: "YieldFarm Pro",
    slug: "yieldfarm",
    category: "DeFi",
    description: "High-yield farming with auto-strategy rotation",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=yieldfarm&backgroundColor=22c55e",
    banner: "https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?w=800",
    website: "https://yieldfarm.pharos",
    contract_address: "0x9876...5432",
    users_today: 19234,
    users_7d: 102345,
    volume_24h: 28901234,
    volume_7d: 198765432,
    tx_count_24h: 56789,
    trend_percent: 9.3,
    tvl: 67000000,
    rank: 10,
    launched: "2026-01-22",
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    hash: "0x8a7d...3f21",
    type: "swap",
    from: "0x7B2d...8C4a",
    to: "0xPharosSwap",
    amount: 45230,
    token: "PHA",
    app: "PharosSwap",
    timestamp: new Date(Date.now() - 1000 * 30),
  },
  {
    id: "2",
    hash: "0x3e8c...9d12",
    type: "mint",
    from: "0x9F1a...2B3c",
    to: "0xNFTVerse",
    amount: 1,
    token: "NFT #2847",
    app: "NFTVerse",
    timestamp: new Date(Date.now() - 1000 * 60),
  },
  {
    id: "3",
    hash: "0x7f2e...4a8b",
    type: "transfer",
    from: "0x4D5e...6F7a",
    to: "0x8G9h...0I1j",
    amount: 15000,
    token: "USDC",
    timestamp: new Date(Date.now() - 1000 * 90),
  },
  {
    id: "4",
    hash: "0x2b9c...7e3f",
    type: "stake",
    from: "0x1A2b...3C4d",
    to: "0xStakeVault",
    amount: 50000,
    token: "PHA",
    app: "StakeVault",
    timestamp: new Date(Date.now() - 1000 * 120),
  },
  {
    id: "5",
    hash: "0x5d8a...1c6e",
    type: "deploy",
    from: "0x6E7f...8G9h",
    to: "0x0000...0000",
    amount: 0,
    token: "",
    timestamp: new Date(Date.now() - 1000 * 180),
  },
  {
    id: "6",
    hash: "0x9e3f...2d7a",
    type: "swap",
    from: "0x8B2c...4D5e",
    to: "0xPharosSwap",
    amount: 12890,
    token: "ETH",
    app: "PharosSwap",
    timestamp: new Date(Date.now() - 1000 * 240),
  },
  {
    id: "7",
    hash: "0x1c4d...8e9f",
    type: "vote",
    from: "0x3F4a...5B6c",
    to: "0xSocialFi",
    amount: 1,
    token: "VOTE",
    app: "SocialFi Hub",
    timestamp: new Date(Date.now() - 1000 * 300),
  },
  {
    id: "8",
    hash: "0x6f8e...3a2b",
    type: "transfer",
    from: "0x7G9h...0I1j",
    to: "0x2K3l...4M5n",
    amount: 2500000,
    token: "PHA",
    timestamp: new Date(Date.now() - 1000 * 360),
  },
];

// Generate chart data
export function generateTransactionChartData(days: number = 30): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Add some realistic variation
    const baseValue = 2000000;
    const weekendDrop = date.getDay() === 0 || date.getDay() === 6 ? 0.7 : 1;
    const randomFactor = 0.8 + Math.random() * 0.4;
    const growthFactor = 1 + (days - i) * 0.02;
    
    const value = Math.floor(baseValue * weekendDrop * randomFactor * growthFactor);
    
    data.push({
      timestamp: date.toISOString().split("T")[0],
      value,
    });
  }
  
  return data;
}

export function generateWalletGrowthData(days: number = 30): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const now = new Date();
  let cumulative = 100000;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Growing wallet base
    const dailyNew = 5000 + Math.floor(Math.random() * 5000);
    cumulative += dailyNew;
    
    data.push({
      timestamp: date.toISOString().split("T")[0],
      value: cumulative,
    });
  }
  
  return data;
}

export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K";
  }
  return num.toString();
}

export function formatCurrency(num: number): string {
  if (num >= 1000000000) {
    return "$" + (num / 1000000000).toFixed(2) + "B";
  }
  if (num >= 1000000) {
    return "$" + (num / 1000000).toFixed(2) + "M";
  }
  if (num >= 1000) {
    return "$" + (num / 1000).toFixed(2) + "K";
  }
  return "$" + num.toString();
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return "just now";
  if (seconds < 3600) return Math.floor(seconds / 60) + "m ago";
  if (seconds < 86400) return Math.floor(seconds / 3600) + "h ago";
  return Math.floor(seconds / 86400) + "d ago";
}