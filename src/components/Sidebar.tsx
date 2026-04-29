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
  Settings,
  ChevronLeft,
  ChevronRight
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
    <aside className={`fixed left-0 top-0 h-screen z-50 transition-all duration-300 sidebar flex flex-col ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Logo */}
      <div className="p-5 border-b border-[var(--border-subtle)]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] via-[#00e5ff] to-[#a855f7] flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.4)]">
            <Zap className="w-5 h-5 text-black" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                PHAROS
              </span>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#00d4ff] -mt-1">
                PULSE
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item group ${isActive ? 'active' : ''}`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#00d4ff]' : ''}`} />
              {!collapsed && (
                <span>{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[var(--border-subtle)]">
        {/* Live Status */}
        <div className="card p-4 mb-3" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(168,85,247,0.04) 100%)' }}>
          <div className="flex items-center gap-3">
            <div className="live-dot" />
            {!collapsed && (
              <>
                <div>
                  <div className="text-sm font-semibold text-white">System Live</div>
                  <div className="text-xs text-[var(--text-muted)]">52 apps • 2.85M txns</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-active)] transition-all"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-xs text-[var(--text-muted)]">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}