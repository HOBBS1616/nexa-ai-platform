'use client';

import React, { useRef, useEffect } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { TranscriptEntry, LanguageCode } from '@/types';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';
import { format } from 'date-fns';

interface CallTranscriptProps {
  transcript: TranscriptEntry[];
  showTranslation?: boolean;
}

export default function CallTranscript({
  transcript,
  showTranslation = true,
}: CallTranscriptProps) {
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  const getLanguageInfo = (code: LanguageCode) => {
    return Object.values(SUPPORTED_LANGUAGES).find((lang) => lang.code === code);
  };

  return (
    <Card variant="elevated" padding="none" className="h-full flex flex-col">
      <CardHeader className="p-4 border-b border-neutral-200">
        <CardTitle>Live Transcript & Translation</CardTitle>
        <p className="text-sm text-neutral-600 mt-1">
          Real-time conversation with multilingual support
        </p>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {transcript.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🎙️</span>
              </div>
              <p className="text-neutral-600 font-medium">Waiting for conversation...</p>
              <p className="text-sm text-neutral-500 mt-1">
                Transcript will appear here in real-time
              </p>
            </div>
          </div>
        ) : (
          <>
            {transcript.map((entry) => {
              const lang = getLanguageInfo(entry.language);
              const isAgent = entry.speaker === 'agent';

              return (
                <div
                  key={entry.id}
                  className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${isAgent ? 'text-right' : 'text-left'}`}>
                    {/* Speaker and Language Badge */}
                    <div className="flex items-center gap-2 mb-1">
                      {!isAgent && (
                        <>
                          <Badge variant="primary" size="sm">
                            Customer
                          </Badge>
                          <Badge variant="neutral" size="sm">
                            {lang?.flag} {lang?.name}
                          </Badge>
                        </>
                      )}
                      {isAgent && (
                        <div className="flex items-center gap-2 ml-auto">
                          <Badge variant="success" size="sm">
                            Agent
                          </Badge>
                          <Badge variant="neutral" size="sm">
                            {lang?.flag} {lang?.name}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Original Text */}
                    <div
                      className={`p-3 rounded-lg ${
                        isAgent
                          ? 'bg-primary-100 text-primary-900'
                          : 'bg-neutral-100 text-neutral-900'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{entry.text}</p>
                    </div>

                    {/* Translation (if different language) */}
                    {showTranslation && entry.translation && entry.language !== 'en' && (
                      <div className="mt-2 p-3 rounded-lg bg-white border border-neutral-200">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-neutral-500">
                            Translation to English
                          </span>
                        </div>
                        <p className="text-sm text-neutral-700 italic">
                          {entry.translation}
                        </p>
                      </div>
                    )}

                    {/* Sentiment Badge */}
                    {entry.sentiment && (
                      <div className="mt-2 flex items-center gap-2">
                        <Badge
                          variant={
                            entry.sentiment.score >= 4
                              ? 'success'
                              : entry.sentiment.score <= 2
                              ? 'danger'
                              : 'neutral'
                          }
                          size="sm"
                        >
                          {entry.sentiment.label} ({entry.sentiment.confidence}%)
                        </Badge>
                        <span className="text-xs text-neutral-500">
                          {format(entry.timestamp, 'HH:mm:ss')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={transcriptEndRef} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
