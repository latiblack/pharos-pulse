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
  Wallet,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Layers
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/explorer', label: 'Explorer', icon: Compass },
  { href: '/rankings', label: 'Rankings', icon: TrendingUp },
  { href: '/live', label: 'Activity', icon: Activity },
  { href: '/insights', label: 'Insights', icon: BarChart3 },
];

const bottomItems = [
  { href: '#', label: 'Documentation', icon: Layers },
  { href: '#', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#0a0a0f] border-r border-[#1a1a28] z-50 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-[#1a1a28]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-base text-white">PHAROS</span>
              <span className="text-[9px] font-bold tracking-[0.25em] text-[#3b82f6] -mt-0.5">PULSE</span>
            </div>
          )}
        </Link>
      </div>

      {/* Wallet Overview */}
      {!collapsed && (
        <div className="p-4 border-b border-[#1a1a28]">
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#1a1a28] to-[#14141f] border border-[#1a1a28]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-[#3b82f6]" />
                <span className="text-xs text-[#71717a]">My Wallet</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#10b981]/10 text-[#10b981]">+12.5%</span>
            </div>
            <p className="text-lg font-bold text-white">$284,739</p>
            <p className="text-[10px] text-[#52525b]">24h: +$3,247</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className={`text-[10px] font-semibold text-[#52525b] uppercase tracking-wider mb-3 px-3 ${collapsed ? 'text-center' : ''}`}>
          {collapsed ? '•••' : 'Menu'}
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20"
                  : "text-[#71717a] hover:text-white hover:bg-[#1a1a28]"
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span className="text-[14px] font-medium">{item.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-3 border-t border-[#1a1a28] space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#71717a] hover:text-white hover:bg-[#1a1a28] transition-colors ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span className="text-[14px]">{item.label}</span>}
            </Link>
          );
        })}

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#71717a] hover:text-white hover:bg-[#1a1a28] transition-colors w-full ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          {collapsed ? (
            <ChevronRight className="w-[18px] h-[18px]" />
          ) : (
            <>
              <ChevronLeft className="w-[18px] h-[18px]" />
              <span className="text-[14px]">Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* System Status */}
      <div className="p-4 border-t border-[#1a1a28]">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-[#10b981]" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#10b981] animate-ping opacity-75" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-[12px] font-medium text-white">System Operational</p>
              <p className="text-[10px] text-[#52525b]">52 apps live</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}