'use client';

import React from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Intent, Action } from '@/types';
import { INTENT_CATEGORIES, EXECUTABLE_ACTIONS } from '@/lib/constants';
import { Target, Zap, CheckCircle } from 'lucide-react';

interface IntentDetectionProps {
  intent: Intent | null;
  suggestedActions: Action[];
  onExecuteAction: (action: Action) => void;
}

export default function IntentDetection({
  intent,
  suggestedActions,
  onExecuteAction,
}: IntentDetectionProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'success';
    if (confidence >= 75) return 'warning';
    return 'danger';
  };

  const getIntentCategory = (categoryId: string) => {
    return Object.values(INTENT_CATEGORIES).find((cat) => cat.id === categoryId);
  };

  return (
    <Card variant="elevated" padding="md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary-600" />
          <CardTitle>Intent Detection</CardTitle>
        </div>
        <p className="text-sm text-neutral-600 mt-1">
          AI-powered conversation understanding
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {!intent ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-slow">
              <Target className="w-6 h-6 text-neutral-400" />
            </div>
            <p className="text-sm text-neutral-600">Analyzing conversation...</p>
            <p className="text-xs text-neutral-500 mt-1">
              Intent will be detected within 30 seconds
            </p>
          </div>
        ) : (
          <>
            {/* Detected Intent */}
            <div className="p-4 rounded-lg bg-primary-50 border border-primary-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="primary" size="md">
                      {getIntentCategory(intent.category)?.label || intent.label}
                    </Badge>
                    <Badge variant={getConfidenceColor(intent.confidence)} size="sm">
                      {intent.confidence}% confident
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-700">
                    Customer wants to: <span className="font-medium">{intent.label}</span>
                  </p>
                </div>
              </div>

              {/* Intent Parameters */}
              {intent.parameters && Object.keys(intent.parameters).length > 0 && (
                <div className="mt-3 pt-3 border-t border-primary-200">
                  <p className="text-xs font-medium text-neutral-700 mb-2">
                    Detected Parameters:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(intent.parameters).map(([key, value]) => (
                      <span
                        key={key}
                        className="px-2 py-1 bg-white rounded text-xs text-neutral-700"
                      >
                        <span className="font-medium">{key}:</span> {String(value)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Actions */}
            {suggestedActions.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-warning-600" />
                  <h4 className="text-sm font-semibold text-neutral-900">
                    Suggested Actions
                  </h4>
                </div>

                <div className="space-y-2">
                  {suggestedActions.map((action) => {
                    const actionConfig = Object.values(EXECUTABLE_ACTIONS).find(
                      (a) => a.id === action.type
                    );

                    return (
                      <div
                        key={action.id}
                        className="p-3 rounded-lg border-2 border-neutral-200 hover:border-primary-300 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {actionConfig?.icon || '⚡'}
                            </span>
                            <div>
                              <p className="font-medium text-neutral-900">
                                {actionConfig?.label || action.label}
                              </p>
                              {action.requiresConsent && (
                                <p className="text-xs text-neutral-500 mt-0.5">
                                  🔒 Requires customer consent
                                </p>
                              )}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant={action.status === 'completed' ? 'success' : 'primary'}
                            onClick={() => onExecuteAction(action)}
                            disabled={
                              action.status === 'executing' ||
                              action.status === 'completed'
                            }
                            leftIcon={
                              action.status === 'completed' ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : undefined
                            }
                          >
                            {action.status === 'pending' && 'Execute'}
                            {action.status === 'executing' && 'Processing...'}
                            {action.status === 'completed' && 'Completed'}
                            {action.status === 'failed' && 'Retry'}
                          </Button>
                        </div>

                        {action.status === 'failed' && action.error && (
                          <div className="mt-2 p-2 bg-danger-50 rounded text-xs text-danger-700">
                            Error: {action.error}
                          </div>
                        )}

                        {action.status === 'completed' && action.result && (
                          <div className="mt-2 p-2 bg-success-50 rounded text-xs text-success-700">
                            ✓ {action.result}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
