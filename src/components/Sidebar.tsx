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
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  Wallet
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/explorer', label: 'Explorer', icon: Compass },
  { href: '/rankings', label: 'Rankings', icon: TrendingUp },
  { href: '/live', label: 'Live Activity', icon: Activity },
  { href: '/insights', label: 'Insights', icon: BarChart3 },
];

const bottomItems = [
  { href: '#', label: 'Settings', icon: Settings },
  { href: '#', label: 'Help & Support', icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#05050a] border-r border-[#1a1a26] z-50 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* Logo */}
      <div className="h-20 flex items-center px-5 border-b border-[#1a1a26]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[#3b82f6]/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white">PHAROS</span>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#3b82f6] -mt-1">PULSE</span>
            </div>
          )}
        </Link>
      </div>

      {/* Wallet Card */}
      {!collapsed && (
        <div className="p-4">
          <div className="bg-gradient-to-br from-[#3b82f6]/10 to-[#8b5cf6]/10 border border-[#3b82f6]/20 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/20 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-[#3b82f6]" />
              </div>
              <div>
                <p className="text-[11px] text-[#71717a]">Total Balance</p>
                <p className="text-lg font-bold text-white">$2,847,392</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#10b981]">+12.5%</span>
              <span className="text-[11px] text-[#71717a]">vs last week</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className={`text-[11px] font-semibold text-[#52525b] uppercase tracking-wider mb-3 px-3 ${collapsed ? 'text-center' : ''}`}>
          {collapsed ? '•••' : 'Menu'}
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-3 border-t border-[#1a1a26] space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`nav-item ${collapsed ? 'justify-center px-2' : ''}`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0 text-[#71717a]" />
              {!collapsed && <span className="text-[#71717a]">{item.label}</span>}
            </Link>
          );
        })}

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`nav-item w-full ${collapsed ? 'justify-center px-2' : ''}`}
        >
          {collapsed ? (
            <ChevronRight className="w-[18px] h-[18px]" />
          ) : (
            <>
              <ChevronLeft className="w-[18px] h-[18px]" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* Live indicator */}
      <div className="p-4 border-t border-[#1a1a26]">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping opacity-75" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-[13px] font-medium text-white">System Online</p>
              <p className="text-[11px] text-[#52525b]">52 apps • 24/7 active</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}