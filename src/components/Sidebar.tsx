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
      className={`fixed left-0 top-0 h-screen bg-[#050508] border-r border-[var(--border-subtle)] z-50 transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-[var(--border-subtle)]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0007b8] to-[#0007b880] flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            {!collapsed && (
              <span className="font-semibold text-[15px] tracking-tight text-white">
                PHAROS<span className="text-[#0007b8]">PULSE</span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-[rgba(0,7,184,0.08)] text-[#0007b8]'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-[rgba(255,255,255,0.03)]'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-[#0007b8]' : 'text-[#71717a] group-hover:text-white'}`} />
                {!collapsed && (
                  <span className={`text-[14px] font-medium ${isActive ? 'text-[#0007b8]' : ''}`}>
                    {item.label}
                  </span>
                )}
                {isActive && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0007b8]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse button */}
        <div className="p-3 border-t border-[var(--border-subtle)]">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-[#71717a] hover:text-white hover:bg-[rgba(255,255,255,0.03)] transition-colors"
          >
            {collapsed ? (
              <Menu className="w-[18px] h-[18px]" />
            ) : (
              <>
                <X className="w-[18px] h-[18px]" />
                <span className="text-[13px]">Collapse</span>
              </>
            )}
          </button>
        </div>

        {/* Live indicator */}
        <div className="p-4 border-t border-[var(--border-subtle)]">
          <div className="card p-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#10b981] animate-ping opacity-75" />
              </div>
              {!collapsed && (
                <div>
                  <p className="text-[13px] font-medium text-white">System Live</p>
                  <p className="text-[11px] text-[#52525b]">52 apps active</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}