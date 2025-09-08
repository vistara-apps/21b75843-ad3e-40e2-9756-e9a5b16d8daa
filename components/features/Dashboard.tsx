'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SymptomChart } from './SymptomChart';
import { ContentCard } from './ContentCard';
import { HealthTrendAlert } from './HealthTrendAlert';
import { Activity, TrendingUp, FileText, Calendar, Plus } from 'lucide-react';
import { formatDate, calculateSeverityColor } from '@/lib/utils';
import type { SymptomLog, Content, HealthTrendAlert as HealthTrendAlertType } from '@/lib/types';

interface DashboardProps {
  onOpenSymptomLog: () => void;
}

export function Dashboard({ onOpenSymptomLog }: DashboardProps) {
  const [recentLogs, setRecentLogs] = useState<SymptomLog[]>([]);
  const [featuredContent, setFeaturedContent] = useState<Content[]>([]);
  const [alerts, setAlerts] = useState<HealthTrendAlertType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockLogs: SymptomLog[] = [
      {
        logId: '1',
        userId: 'user1',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        symptoms: ['Headache', 'Fatigue'],
        triggers: ['Stress', 'Lack of Sleep'],
        treatmentResponses: [{ treatment: 'Rest', effectiveness: 7 }],
        severity: 6,
        mood: 4,
        notes: 'Busy day at work, didn\'t sleep well last night'
      },
      {
        logId: '2',
        userId: 'user1',
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        symptoms: ['Mild Headache'],
        triggers: ['Weather Changes'],
        treatmentResponses: [{ treatment: 'Hydration', effectiveness: 8 }],
        severity: 3,
        mood: 7,
      },
    ];

    const mockContent: Content[] = [
      {
        contentId: '1',
        title: 'New Research: Sleep Quality and Migraine Prevention',
        url: 'https://example.com/sleep-migraine-research',
        type: 'research',
        summary: 'Recent studies show that maintaining consistent sleep patterns can reduce migraine frequency by up to 40%.',
        relevantConditions: ['migraines'],
        author: 'Dr. Sarah Johnson',
        publishedDate: new Date().toISOString(),
        readingTime: 5,
        isPremium: false,
      },
      {
        contentId: '2',
        title: 'Managing Stress-Related Symptoms: A Comprehensive Guide',
        url: 'https://example.com/stress-management',
        type: 'article',
        summary: 'Learn evidence-based techniques for managing stress and its impact on chronic health conditions.',
        relevantConditions: ['anxiety', 'migraines'],
        publishedDate: new Date(Date.now() - 86400000).toISOString(),
        readingTime: 8,
        isPremium: true,
      },
    ];

    const mockAlerts: HealthTrendAlertType[] = [
      {
        alertId: '1',
        userId: 'user1',
        timestamp: new Date().toISOString(),
        title: 'New Treatment Option for Chronic Migraines',
        summary: 'FDA approves new preventive medication with 50% reduction in migraine days for clinical trial participants.',
        sourceUrl: 'https://example.com/new-migraine-treatment',
        relevanceScore: 0.95,
        category: 'treatment',
        isRead: false,
        priority: 'high',
      },
    ];

    setRecentLogs(mockLogs);
    setFeaturedContent(mockContent);
    setAlerts(mockAlerts);
    setIsLoading(false);
  }, []);

  const handleMarkAlertAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.alertId === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.alertId !== alertId));
  };

  const handleViewSource = (url: string) => {
    window.open(url, '_blank');
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const latestLog = recentLogs[0];
  const averageSeverity = recentLogs.length > 0 
    ? recentLogs.reduce((sum, log) => sum + log.severity, 0) / recentLogs.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">Dashboard</h1>
          <p className="text-textSecondary">Track your health journey</p>
        </div>
        <Button onClick={onOpenSymptomLog} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Log Symptom</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="metric-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-textSecondary">Total Logs</p>
              <p className="text-xl font-semibold text-textPrimary">{recentLogs.length}</p>
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-textSecondary">Avg Severity</p>
              <p className={`text-xl font-semibold ${calculateSeverityColor(averageSeverity)}`}>
                {averageSeverity.toFixed(1)}/10
              </p>
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-textSecondary">New Alerts</p>
              <p className="text-xl font-semibold text-textPrimary">
                {alerts.filter(a => !a.isRead).length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-textSecondary">Last Log</p>
              <p className="text-sm font-medium text-textPrimary">
                {latestLog ? formatDate(latestLog.timestamp) : 'No logs yet'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      {recentLogs.length > 0 && (
        <SymptomChart logs={recentLogs} title="Recent Symptom Trends" />
      )}

      {/* Health Trend Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-textPrimary">Health Trend Alerts</h2>
          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <HealthTrendAlert
                key={alert.alertId}
                alert={alert}
                onMarkAsRead={handleMarkAlertAsRead}
                onDismiss={handleDismissAlert}
                onViewSource={handleViewSource}
              />
            ))}
          </div>
        </div>
      )}

      {/* Featured Content */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-textPrimary">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredContent.map((content) => (
            <ContentCard
              key={content.contentId}
              content={content}
              onClick={() => handleViewSource(content.url)}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {recentLogs.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-textPrimary">Recent Activity</h2>
          <div className="space-y-3">
            {recentLogs.slice(0, 3).map((log) => (
              <Card key={log.logId} variant="glass" padding="sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-textPrimary">
                        {formatDate(log.timestamp)}
                      </span>
                      <Badge
                        variant={log.severity <= 3 ? 'success' : log.severity <= 6 ? 'warning' : 'danger'}
                        size="sm"
                      >
                        Severity {log.severity}/10
                      </Badge>
                    </div>
                    <p className="text-sm text-textSecondary">
                      {log.symptoms.join(', ')}
                    </p>
                    {log.triggers.length > 0 && (
                      <p className="text-xs text-textSecondary mt-1">
                        Triggers: {log.triggers.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
