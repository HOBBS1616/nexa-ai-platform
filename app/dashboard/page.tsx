'use client';

import React from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import {
  Phone,
  Clock,
  CheckCircle,
  Shield,
  Users,
  TrendingUp,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import { DashboardStats, AgentPerformance } from '@/types';

// Mock data - will be replaced with real API calls
const mockStats: DashboardStats = {
  activeCalls: 47,
  queuedCalls: 12,
  totalCallsToday: 1247,
  averageHandleTime: 7.2,
  firstCallResolution: 82,
  complianceScore: 98,
  activeAgents: 89,
  totalAgents: 120,
};

const mockAgentPerformance: AgentPerformance[] = [
  {
    agentId: '1',
    agentName: 'Chidi Okafor',
    callsHandled: 45,
    averageHandleTime: 6.5,
    firstCallResolution: 85,
    customerSatisfaction: 4.7,
    complianceScore: 99,
    status: 'on_call',
  },
  {
    agentId: '2',
    agentName: 'Aisha Bello',
    callsHandled: 52,
    averageHandleTime: 7.1,
    firstCallResolution: 88,
    customerSatisfaction: 4.8,
    complianceScore: 98,
    status: 'active',
  },
  {
    agentId: '3',
    agentName: 'Tunde Adeyemi',
    callsHandled: 38,
    averageHandleTime: 8.2,
    firstCallResolution: 78,
    customerSatisfaction: 4.5,
    complianceScore: 96,
    status: 'on_call',
  },
  {
    agentId: '4',
    agentName: 'Ngozi Eze',
    callsHandled: 49,
    averageHandleTime: 6.8,
    firstCallResolution: 90,
    customerSatisfaction: 4.9,
    complianceScore: 100,
    status: 'active',
  },
  {
    agentId: '5',
    agentName: 'Yusuf Ibrahim',
    callsHandled: 41,
    averageHandleTime: 7.5,
    firstCallResolution: 82,
    customerSatisfaction: 4.6,
    complianceScore: 97,
    status: 'break',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600 mt-1">
          Real-time overview of contact centre operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Calls"
          value={mockStats.activeCalls}
          subtitle={`${mockStats.queuedCalls} in queue`}
          icon={Phone}
          iconColor="primary"
        />
        <StatsCard
          title="Avg Handle Time"
          value={`${mockStats.averageHandleTime}m`}
          subtitle="Target: 7 minutes"
          icon={Clock}
          iconColor="success"
          trend={{ value: 28.3, isPositive: true }}
        />
        <StatsCard
          title="First Call Resolution"
          value={`${mockStats.firstCallResolution}%`}
          subtitle="Target: 80%"
          icon={CheckCircle}
          iconColor="success"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Compliance Score"
          value={`${mockStats.complianceScore}%`}
          subtitle="CBN/NDPR Audit Ready"
          icon={Shield}
          iconColor="primary"
          trend={{ value: 8.2, isPositive: true }}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Calls Today"
          value={mockStats.totalCallsToday.toLocaleString()}
          icon={TrendingUp}
          iconColor="primary"
        />
        <StatsCard
          title="Active Agents"
          value={`${mockStats.activeAgents}/${mockStats.totalAgents}`}
          subtitle={`${Math.round((mockStats.activeAgents / mockStats.totalAgents) * 100)}% utilization`}
          icon={Users}
          iconColor="warning"
        />
        <StatsCard
          title="System Status"
          value="Operational"
          subtitle="All systems running"
          icon={Activity}
          iconColor="success"
        />
        <StatsCard
          title="Critical Alerts"
          value="3"
          subtitle="Requires attention"
          icon={AlertTriangle}
          iconColor="danger"
        />
      </div>

      {/* Agent Performance Table */}
      <Card variant="elevated" padding="none">
        <CardHeader className="p-6 border-b border-neutral-200">
          <CardTitle>Top Agent Performance</CardTitle>
          <p className="text-sm text-neutral-600 mt-1">
            Real-time performance metrics for active agents
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="text-left py-3 px-4">Agent</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-center py-3 px-4">Calls</th>
                  <th className="text-center py-3 px-4">AHT</th>
                  <th className="text-center py-3 px-4">FCR</th>
                  <th className="text-center py-3 px-4">CSAT</th>
                  <th className="text-center py-3 px-4">Compliance</th>
                </tr>
              </thead>
              <tbody>
                {mockAgentPerformance.map((agent) => (
                  <tr key={agent.agentId} className="table-row">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold">
                          {agent.agentName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">
                            {agent.agentName}
                          </p>
                          <p className="text-sm text-neutral-500">
                            ID: {agent.agentId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`status-badge ${
                          agent.status === 'on_call'
                            ? 'status-pending'
                            : agent.status === 'active'
                            ? 'status-active'
                            : 'status-inactive'
                        }`}
                      >
                        {agent.status === 'on_call'
                          ? 'On Call'
                          : agent.status === 'active'
                          ? 'Active'
                          : 'Break'}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4 font-medium">
                      {agent.callsHandled}
                    </td>
                    <td className="text-center py-3 px-4">
                      {agent.averageHandleTime}m
                    </td>
                    <td className="text-center py-3 px-4">
                      <span
                        className={`font-medium ${
                          agent.firstCallResolution >= 85
                            ? 'text-success-600'
                            : agent.firstCallResolution >= 75
                            ? 'text-warning-600'
                            : 'text-danger-600'
                        }`}
                      >
                        {agent.firstCallResolution}%
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-medium">
                          {agent.customerSatisfaction}
                        </span>
                        <span className="text-warning-500">★</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span
                        className={`font-medium ${
                          agent.complianceScore >= 98
                            ? 'text-success-600'
                            : agent.complianceScore >= 95
                            ? 'text-warning-600'
                            : 'text-danger-600'
                        }`}
                      >
                        {agent.complianceScore}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: 'warning',
                  message: 'High queue time detected',
                  time: '2 minutes ago',
                },
                {
                  type: 'success',
                  message: 'Compliance audit completed',
                  time: '15 minutes ago',
                },
                {
                  type: 'error',
                  message: 'Translation confidence below threshold',
                  time: '32 minutes ago',
                },
              ].map((alert, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'warning'
                        ? 'bg-warning-500'
                        : alert.type === 'success'
                        ? 'bg-success-500'
                        : 'bg-danger-500'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">
                      {alert.message}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Translation Engine', status: 'operational', uptime: 99.9 },
                { name: 'Intent Detection', status: 'operational', uptime: 99.7 },
                { name: 'Voice Biometrics', status: 'operational', uptime: 98.5 },
                { name: 'Compliance Logger', status: 'operational', uptime: 100 },
              ].map((system, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-success-500 pulse-indicator" />
                    <span className="text-sm font-medium text-neutral-900">
                      {system.name}
                    </span>
                  </div>
                  <span className="text-sm text-neutral-600">
                    {system.uptime}% uptime
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
