"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Compass, Trophy, Activity, FileText, Zap } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: BarChart3 },
  { href: "/explorer", label: "Explorer", icon: Compass },
  { href: "/rankings", label: "Rankings", icon: Trophy },
  { href: "/live", label: "Live Feed", icon: Activity },
  { href: "/insights", label: "Insights", icon: FileText },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-pharos-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pharos-electric to-pharos-neon flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-pharos-electric to-pharos-neon rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">
                PHAROS<span className="text-pharos-electric">PULSE</span>
              </span>
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-pharos-electric/20 text-pharos-electric rounded-full">
                LIVE
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-pharos-electric/10 text-pharos-electric"
                      : "text-pharos-muted hover:text-white hover:bg-pharos-card"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pharos-card border border-pharos-border">
              <div className="w-2 h-2 rounded-full bg-pharos-success animate-pulse" />
              <span className="text-sm font-mono text-pharos-muted">
                52 Apps Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}