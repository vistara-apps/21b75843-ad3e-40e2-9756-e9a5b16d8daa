'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TrendingUp, ExternalLink, X } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';
import type { HealthTrendAlert as HealthTrendAlertType } from '@/lib/types';

interface HealthTrendAlertProps {
  alert: HealthTrendAlertType;
  onMarkAsRead: (alertId: string) => void;
  onDismiss: (alertId: string) => void;
  onViewSource: (url: string) => void;
}

export function HealthTrendAlert({
  alert,
  onMarkAsRead,
  onDismiss,
  onViewSource,
}: HealthTrendAlertProps) {
  const priorityColors = {
    low: 'success',
    medium: 'warning',
    high: 'danger',
  } as const;

  return (
    <Card
      variant={alert.isRead ? 'default' : 'elevated'}
      className={`transition-all duration-200 ${
        !alert.isRead ? 'border-l-4 border-l-primary' : ''
      }`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
            <Badge variant={priorityColors[alert.priority]} size="sm">
              {alert.priority} priority
            </Badge>
            <Badge variant="secondary" size="sm">
              {alert.category}
            </Badge>
          </div>
          <button
            onClick={() => onDismiss(alert.alertId)}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <X className="w-4 h-4 text-textSecondary" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-semibold text-textPrimary">{alert.title}</h3>
          <p className="text-sm text-textSecondary">{alert.summary}</p>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-textSecondary">
          <span>
            {formatDate(alert.timestamp)} at {formatTime(alert.timestamp)}
          </span>
          <span>Relevance: {Math.round(alert.relevanceScore * 100)}%</span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewSource(alert.sourceUrl)}
            className="flex-1"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Source
          </Button>
          {!alert.isRead && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onMarkAsRead(alert.alertId)}
              className="flex-1"
            >
              Mark as Read
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
