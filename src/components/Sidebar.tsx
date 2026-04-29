'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Compass, 
  TrendingUp, 
  Activity, 
  BarChart3,
  Zap,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/explorer', label: 'Explorer', icon: Compass },
  { href: '/rankings', label: 'Rankings', icon: TrendingUp },
  { href: '/live', label: 'Live Feed', icon: Activity },
  { href: '/insights', label: 'Insights', icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen glass-card border-l-0 border-y-0 rounded-none z-50 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      style={{ background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.98) 0%, rgba(5, 5, 8, 1) 100%)' }}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between border-b border-[var(--border)]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center">
            <Zap className="w-5 h-5 text-black" />
          </div>
          {!collapsed && (
            <span className="font-bold text-xl tracking-tight">
              PHAROS<span className="text-[#00d4ff]">PULSE</span>
            </span>
          )}
        </Link>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-[var(--border)] transition-colors lg:block"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-[#00d4ff]/15 to-[#a855f7]/10 border border-[#00d4ff]/30' 
                  : 'hover:bg-[var(--border)] border border-transparent'
              }`}
            >
              <Icon 
                className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-[#00d4ff]' : 'text-[var(--text-muted)] group-hover:text-white'
                }`} 
              />
              {!collapsed && (
                <span className={`font-medium ${isActive ? 'text-white' : 'text-[var(--text-secondary)] group-hover:text-white'}`}>
                  {item.label}
                </span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_10px_#00d4ff]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Live indicator */}
      <div className="absolute bottom-6 left-0 right-0 px-4">
        <div className={`glass-card p-4 ${collapsed ? 'px-2' : ''}`} style={{ background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)' }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#00d4ff]" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#00d4ff] animate-ping opacity-75" />
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold text-white">System Live</p>
                <p className="text-xs text-[var(--text-muted)]">52 apps active</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}