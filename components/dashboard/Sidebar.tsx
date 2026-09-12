'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Phone,
  Users,
  BarChart3,
  Shield,
  Settings,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface SidebarProps {
  userRole: 'agent' | 'supervisor' | 'manager' | 'admin';
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['agent', 'supervisor', 'manager', 'admin'],
  },
  {
    label: 'Active Calls',
    href: '/calls',
    icon: Phone,
    roles: ['agent', 'supervisor', 'manager', 'admin'],
  },
  {
    label: 'Customers',
    href: '/customers',
    icon: Users,
    roles: ['agent', 'supervisor', 'manager', 'admin'],
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    roles: ['supervisor', 'manager', 'admin'],
  },
  {
    label: 'Compliance',
    href: '/compliance',
    icon: Shield,
    roles: ['supervisor', 'manager', 'admin'],
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: FileText,
    roles: ['manager', 'admin'],
  },
  {
    label: 'Alerts',
    href: '/alerts',
    icon: AlertCircle,
    roles: ['supervisor', 'manager', 'admin'],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['agent', 'supervisor', 'manager', 'admin'],
  },
];

export default function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole));

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-200">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900">NEXA AI</h1>
            <p className="text-xs text-neutral-500">Contact Centre Intelligence</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'nav-item',
                isActive && 'nav-item-active'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200">
        <div className="px-4 py-3 bg-primary-50 rounded-lg">
          <p className="text-sm font-medium text-primary-900">Need Help?</p>
          <p className="text-xs text-primary-700 mt-1">
            Contact support for assistance
          </p>
          <button className="mt-2 text-xs font-medium text-primary-600 hover:text-primary-700">
            Get Support →
          </button>
        </div>
      </div>
    </aside>
  );
}
