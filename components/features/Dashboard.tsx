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
      <div className="space-y-8 animate-fade-in">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="shimmer h-8 w-64 rounded-lg" />
            <div className="shimmer h-4 w-48 rounded" />
          </div>
          <div className="shimmer h-12 w-32 rounded-lg" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="metric-card">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="shimmer w-12 h-12 rounded-xl" />
                  <div className="text-right space-y-1">
                    <div className="shimmer h-8 w-12 rounded" />
                    <div className="shimmer h-3 w-16 rounded" />
                  </div>
                </div>
                <div className="shimmer h-1 w-full rounded-full" />
              </div>
            </Card>
          ))}
        </div>

        {/* Chart Skeleton */}
        <Card className="content-card">
          <div className="space-y-4">
            <div className="shimmer h-6 w-48 rounded" />
            <div className="shimmer h-64 w-full rounded-lg" />
          </div>
        </Card>

        {/* Content Sections Skeleton */}
        {[...Array(2)].map((_, sectionIndex) => (
          <section key={sectionIndex} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="shimmer h-6 w-40 rounded" />
                <div className="shimmer h-4 w-64 rounded" />
              </div>
              <div className="shimmer h-4 w-20 rounded" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(2)].map((_, cardIndex) => (
                <Card key={cardIndex} className="content-card">
                  <div className="space-y-3">
                    <div className="shimmer h-5 w-3/4 rounded" />
                    <div className="shimmer h-4 w-full rounded" />
                    <div className="shimmer h-4 w-2/3 rounded" />
                    <div className="flex items-center space-x-2">
                      <div className="shimmer h-4 w-16 rounded-full" />
                      <div className="shimmer h-4 w-12 rounded-full" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  const latestLog = recentLogs[0];
  const averageSeverity = recentLogs.length > 0 
    ? recentLogs.reduce((sum, log) => sum + log.severity, 0) / recentLogs.length 
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="heading-1">Good morning! 👋</h1>
          <p className="body-small">Here's your health overview for today</p>
        </div>
        <Button 
          onClick={onOpenSymptomLog} 
          className="btn-primary flex items-center space-x-2 interactive"
        >
          <Plus className="w-4 h-4" />
          <span>Log Symptom</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="metric-card interactive">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-textPrimary">{recentLogs.length}</p>
                <p className="caption">Total Logs</p>
              </div>
            </div>
            <div className="h-1 bg-secondary-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${Math.min((recentLogs.length / 10) * 100, 100)}%` }}
              />
            </div>
          </div>
        </Card>

        <Card className="metric-card interactive">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-accent/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${calculateSeverityColor(averageSeverity)}`}>
                  {averageSeverity.toFixed(1)}
                </p>
                <p className="caption">Avg Severity</p>
              </div>
            </div>
            <div className="h-1 bg-secondary-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  averageSeverity <= 3 ? 'bg-success' : 
                  averageSeverity <= 6 ? 'bg-warning' : 'bg-danger'
                }`}
                style={{ width: `${(averageSeverity / 10) * 100}%` }}
              />
            </div>
          </div>
        </Card>

        <Card className="metric-card interactive">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-warning/10 rounded-xl">
                <FileText className="w-6 h-6 text-warning" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-textPrimary">
                  {alerts.filter(a => !a.isRead).length}
                </p>
                <p className="caption">New Alerts</p>
              </div>
            </div>
            {alerts.filter(a => !a.isRead).length > 0 && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                <p className="text-xs text-warning font-medium">Requires attention</p>
              </div>
            )}
          </div>
        </Card>

        <Card className="metric-card interactive">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-success/10 rounded-xl">
                <Calendar className="w-6 h-6 text-success" />
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-textPrimary">
                  {latestLog ? formatDate(latestLog.timestamp) : 'No logs yet'}
                </p>
                <p className="caption">Last Log</p>
              </div>
            </div>
            {latestLog && (
              <div className="text-xs text-textSecondary">
                {latestLog.symptoms.slice(0, 2).join(', ')}
                {latestLog.symptoms.length > 2 && '...'}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Charts */}
      {recentLogs.length > 0 && (
        <SymptomChart logs={recentLogs} title="Recent Symptom Trends" />
      )}

      {/* Health Trend Alerts */}
      {alerts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="heading-2">Health Trend Alerts</h2>
              <p className="body-small">Latest research and updates relevant to your conditions</p>
            </div>
            <Badge variant="warning" className="animate-pulse">
              {alerts.filter(a => !a.isRead).length} new
            </Badge>
          </div>
          <div className="space-y-4">
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
        </section>
      )}

      {/* Featured Content */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="heading-2">Recommended for You</h2>
            <p className="body-small">Curated health content based on your conditions</p>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-600">
            View all →
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredContent.map((content) => (
            <ContentCard
              key={content.contentId}
              content={content}
              onClick={() => handleViewSource(content.url)}
            />
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      {recentLogs.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="heading-2">Recent Activity</h2>
              <p className="body-small">Your latest symptom logs and patterns</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-600">
              View all logs →
            </Button>
          </div>
          <div className="space-y-4">
            {recentLogs.slice(0, 3).map((log) => (
              <Card key={log.logId} className="content-card interactive">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="body-small font-medium">
                          {formatDate(log.timestamp)}
                        </span>
                      </div>
                      <Badge
                        variant={log.severity <= 3 ? 'success' : log.severity <= 6 ? 'warning' : 'danger'}
                        size="sm"
                      >
                        {log.severity}/10
                      </Badge>
                    </div>
                    <div>
                      <p className="body-medium font-medium text-textPrimary">
                        {log.symptoms.join(', ')}
                      </p>
                      {log.triggers.length > 0 && (
                        <p className="caption mt-1">
                          <span className="text-textTertiary">Triggers:</span> {log.triggers.join(', ')}
                        </p>
                      )}
                      {log.notes && (
                        <p className="caption mt-1 text-textSecondary italic">
                          "{log.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <div className={`w-3 h-3 rounded-full ${
                      log.severity <= 3 ? 'bg-success' : 
                      log.severity <= 6 ? 'bg-warning' : 'bg-danger'
                    }`} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
