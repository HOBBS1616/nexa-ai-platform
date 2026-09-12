'use client';

import React, { useState } from 'react';
import { Bell, Search, ChevronDown, LogOut, User as UserIcon, Settings } from 'lucide-react';
import { User } from '@/types';
import { cn, getInitials } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface HeaderProps {
  user: User;
  notificationCount?: number;
}

export default function Header({ user, notificationCount = 0 }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success-500';
      case 'on_call':
        return 'bg-warning-500';
      case 'break':
        return 'bg-neutral-400';
      case 'inactive':
        return 'bg-neutral-300';
      default:
        return 'bg-neutral-300';
    }
  };

  const getStatusLabel = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'on_call':
        return 'On Call';
      case 'break':
        return 'On Break';
      case 'inactive':
        return 'Inactive';
      default:
        return 'Unknown';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search customers, calls, tickets..."
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-neutral-600" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-danger-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold">
                    {getInitials(user.name)}
                  </div>
                )}
                <span
                  className={cn(
                    'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
                    getStatusColor(user.status)
                  )}
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                <p className="text-xs text-neutral-500 capitalize">{user.role}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </button>

            {/* Dropdown */}
            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-medium border border-neutral-200 py-2 z-50 animate-fade-in">
                  {/* Status Info */}
                  <div className="px-4 py-3 border-b border-neutral-200">
                    <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                    <p className="text-xs text-neutral-500">{user.email}</p>
                    <div className="mt-2">
                      <Badge
                        variant={user.status === 'active' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {getStatusLabel(user.status)}
                      </Badge>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3">
                      <UserIcon className="w-4 h-4" />
                      My Profile
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                  </div>

                  <div className="border-t border-neutral-200 pt-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-danger-600 hover:bg-danger-50 flex items-center gap-3">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
