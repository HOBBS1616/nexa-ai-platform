'use client';

import React from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { CustomerContext, Product, Transaction } from '@/types';
import { formatNaira } from '@/lib/utils';
import { format } from 'date-fns';
import {
  User,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Clock,
  Phone as PhoneIcon,
} from 'lucide-react';

interface Customer360Props {
  context: CustomerContext | null;
}

export default function Customer360({ context }: Customer360Props) {
  if (!context) {
    return (
      <Card variant="elevated" padding="md">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-8 h-8 text-neutral-400" />
          </div>
          <p className="text-neutral-600 font-medium">No customer data available</p>
          <p className="text-sm text-neutral-500 mt-1">
            Customer information will appear once call is connected
          </p>
        </div>
      </Card>
    );
  }

  const { customer, recentTransactions, activeProducts, tickets } = context;

  const getAccountStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'dormant':
        return 'warning';
      case 'frozen':
        return 'danger';
      case 'closed':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'corporate':
        return 'primary';
      case 'premium':
        return 'warning';
      case 'retail':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-4">
      {/* Customer Header */}
      <Card variant="elevated" padding="md">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {customer.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900">{customer.name}</h3>
              <p className="text-sm text-neutral-600 mt-0.5">
                {customer.accountNumber}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={getTierColor(customer.tier)} size="sm">
                  {customer.tier.toUpperCase()}
                </Badge>
                <Badge
                  variant={getAccountStatusColor(customer.accountStatus)}
                  size="sm"
                >
                  {customer.accountStatus}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-neutral-900">
              {formatNaira(customer.accountBalance)}
            </p>
            <p className="text-xs text-neutral-500 mt-1">Account Balance</p>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mt-4 pt-4 border-t border-neutral-200 grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-neutral-500">Phone Number</p>
            <p className="text-sm font-medium text-neutral-900">{customer.phoneNumber}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Email</p>
            <p className="text-sm font-medium text-neutral-900">
              {customer.email || 'Not provided'}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">BVN</p>
            <p className="text-sm font-medium text-neutral-900">{customer.bvn}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Preferred Language</p>
            <p className="text-sm font-medium text-neutral-900 capitalize">
              {customer.preferredLanguage}
            </p>
          </div>
        </div>

        {/* Risk Score */}
        {customer.riskScore !== undefined && (
          <div className="mt-4 pt-4 border-t border-neutral-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-700">Risk Score</span>
              <Badge
                variant={customer.riskScore < 30 ? 'success' : customer.riskScore < 70 ? 'warning' : 'danger'}
                size="sm"
              >
                {customer.riskScore}/100
              </Badge>
            </div>
            <div className="mt-2 h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  customer.riskScore < 30
                    ? 'bg-success-500'
                    : customer.riskScore < 70
                    ? 'bg-warning-500'
                    : 'bg-danger-500'
                }`}
                style={{ width: `${customer.riskScore}%` }}
              />
            </div>
          </div>
        )}
      </Card>

      {/* Active Products */}
      <Card variant="elevated" padding="md">
        <CardHeader className="p-0 mb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary-600" />
            <CardTitle className="text-base">Active Products</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0 space-y-2">
          {activeProducts.length === 0 ? (
            <p className="text-sm text-neutral-500">No active products</p>
          ) : (
            activeProducts.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {product.accountNumber || product.cardNumber || product.type}
                    </p>
                  </div>
                  <Badge
                    variant={product.status === 'active' ? 'success' : 'danger'}
                    size="sm"
                  >
                    {product.status}
                  </Badge>
                </div>
                {product.balance !== undefined && (
                  <p className="text-sm font-semibold text-neutral-900 mt-2">
                    {formatNaira(product.balance)}
                  </p>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card variant="elevated" padding="md">
        <CardHeader className="p-0 mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success-600" />
            <CardTitle className="text-base">Recent Transactions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0 space-y-2">
          {recentTransactions.length === 0 ? (
            <p className="text-sm text-neutral-500">No recent transactions</p>
          ) : (
            recentTransactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="p-2 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {format(transaction.timestamp, 'dd MMM, HH:mm')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${
                        transaction.type === 'credit'
                          ? 'text-success-600'
                          : 'text-danger-600'
                      }`}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}
                      {formatNaira(transaction.amount)}
                    </p>
                    <Badge
                      variant={
                        transaction.status === 'completed'
                          ? 'success'
                          : transaction.status === 'pending'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Open Tickets */}
      {tickets.length > 0 && (
        <Card variant="elevated" padding="md">
          <CardHeader className="p-0 mb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-warning-600" />
              <CardTitle className="text-base">Open Tickets</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 space-y-2">
            {tickets.slice(0, 3).map((ticket) => (
              <div
                key={ticket.id}
                className="p-3 rounded-lg bg-warning-50 border border-warning-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {ticket.subject}
                    </p>
                    <p className="text-xs text-neutral-600 mt-1">
                      {ticket.description}
                    </p>
                    <p className="text-xs text-neutral-500 mt-2">
                      Created {format(ticket.createdAt, 'dd MMM yyyy')}
                    </p>
                  </div>
                  <Badge
                    variant={
                      ticket.priority === 'urgent'
                        ? 'danger'
                        : ticket.priority === 'high'
                        ? 'warning'
                        : 'neutral'
                    }
                    size="sm"
                  >
                    {ticket.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Calls */}
      <Card variant="elevated" padding="md">
        <CardHeader className="p-0 mb-3">
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4 text-primary-600" />
            <CardTitle className="text-base">Recent Calls</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {context.recentCalls.length === 0 ? (
            <p className="text-sm text-neutral-500">No recent calls</p>
          ) : (
            <div className="space-y-2">
              {context.recentCalls.slice(0, 3).map((call) => (
                <div
                  key={call.id}
                  className="p-2 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {call.status === 'completed' ? 'Completed Call' : call.status}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {format(call.startTime, 'dd MMM, HH:mm')}
                        {call.duration && ` • ${Math.floor(call.duration / 60)}m ${call.duration % 60}s`}
                      </p>
                    </div>
                    <Clock className="w-4 h-4 text-neutral-400" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
