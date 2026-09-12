'use client';

import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { User } from '@/types';

// Mock user data - will be replaced with real auth
const mockUser: User = {
  id: '1',
  name: 'Anjola Ishola',
  email: 'anjola@nexainnovations.com',
  role: 'admin',
  status: 'active',
  department: 'Operations',
  lastActive: new Date(),
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar userRole={mockUser.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} notificationCount={3} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
