# Pharos Pulse 🟦

> Live analytics and discovery dashboard for the Pharos Network ecosystem

Pharos Pulse is the ultimate dashboard for exploring the Pharos Network ecosystem. Track every major app, wallet trend, and ecosystem signal in real-time.

![Pharos Pulse](https://img.shields.io/badge/Pharos-Pulse-00d4ff?style=for-the-badge&logo=blockchain)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📊 Dashboard
- Real-time ecosystem stats (live apps, transactions, wallets)
- Interactive charts (transactions over time, wallet growth)
- Trending apps discovery
- Live transaction feed

### 🔍 Ecosystem Explorer
- Browse all 50+ ecosystem apps
- Filter by category (DeFi, Gaming, NFT, Infrastructure, Social, Payments, RWA, AI)
- Search and sort functionality
- Detailed app cards with stats

### 🏆 Rankings
- Leaderboards by users, volume, growth, and newest
- Real-time ranking updates
- Score visualization

### 📡 Live Feed
- Terminal-style live transaction feed
- Auto-updating with new transactions
- Transaction type categorization (swap, mint, transfer, deploy, vote, stake)

### 📈 Insights
- Auto-generated ecosystem intelligence
- Category distribution charts
- Trending narratives
- Retention metrics

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/latiblack/pharos-pulse.git
cd pharos-pulse

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data**: Mock JSON (ready for Goldsky integration)

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage dashboard with stats & charts |
| `/explorer` | Browse all ecosystem apps |
| `/app/[slug]` | Individual app detail page |
| `/rankings` | Leaderboards |
| `/live` | Live transaction feed |
| `/insights` | Ecosystem insights & analytics |

## 🎨 Design System

### Colors

```css
--pharos-bg: #0a0a0f        /* Dark background */
--pharos-card: #12121a      /* Card background */
--pharos-border: #1e1e2e    /* Border color */
--pharos-electric: #00d4ff  /* Electric blue */
--pharos-neon: #a855f7      /* Neon purple */
--pharos-success: #22c55e   /* Success green */
--pharos-danger: #ef4444    /* Danger red */
```

### Design Features

- Glassmorphism cards
- Glow effects on interactive elements
- Smooth animations
- Mobile-first responsive design
- Terminal-style live feed

## 📊 Data Architecture

The mock data is structured for easy Goldsky integration:

```typescript
interface App {
  id: string;
  name: string;
  category: "DeFi" | "Gaming" | "NFT" | ...;
  users_today: number;
  volume_24h: number;
  trend_percent: number;
  contract_address: string;
  // ... more fields
}
```

See [`src/lib/mockData.ts`](src/lib/mockData.ts) for the complete data schema.

## 🔄 Integration Guide

### Connecting to Goldsky

1. Install Goldsky CLI:
```bash
npm install -g @goldskycom/cli
```

2. Add your subgraph:
```bash
goldsky subgraph create pharos-network
```

3. Update API calls in components to fetch from Goldsky subgraph

### Adding More Apps

Edit [`src/lib/mockData.ts`](src/lib/mockData.ts) to add more ecosystem apps:

```typescript
export const MOCK_APPS: App[] = [
  {
    id: "11",
    name: "NewApp",
    slug: "newapp",
    category: "DeFi",
    // ... more fields
  },
];
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- [Pharos Network](https://pharos.network)
- [Pharos Docs](https://docs.pharos.network)
- [Goldsky](https://goldsky.com)

---

Built with ❤️ for the Pharos ecosystem