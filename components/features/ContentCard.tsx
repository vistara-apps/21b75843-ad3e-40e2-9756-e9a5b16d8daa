'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink, Clock, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Content } from '@/lib/types';

interface ContentCardProps {
  content: Content;
  variant?: 'default' | 'compact';
  onClick?: () => void;
}

export function ContentCard({ content, variant = 'default', onClick }: ContentCardProps) {
  const isCompact = variant === 'compact';

  return (
    <Card
      variant="glass"
      padding={isCompact ? 'sm' : 'md'}
      onClick={onClick}
      className="hover:shadow-lg cursor-pointer"
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={`font-semibold text-textPrimary line-clamp-2 ${
              isCompact ? 'text-sm' : 'text-lg'
            }`}>
              {content.title}
            </h3>
            {content.author && (
              <div className="flex items-center space-x-1 mt-1">
                <User className="w-3 h-3 text-textSecondary" />
                <span className="text-xs text-textSecondary">{content.author}</span>
              </div>
            )}
          </div>
          <ExternalLink className="w-4 h-4 text-textSecondary flex-shrink-0 ml-2" />
        </div>

        {/* Content Type & Premium Badge */}
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" size="sm">
            {content.type}
          </Badge>
          {content.isPremium && (
            <Badge variant="warning" size="sm">
              Premium
            </Badge>
          )}
        </div>

        {/* Summary */}
        {!isCompact && (
          <p className="text-sm text-textSecondary line-clamp-3">
            {content.summary}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-textSecondary">
          <div className="flex items-center space-x-4">
            <span>{formatDate(content.publishedDate)}</span>
            {content.readingTime && (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{content.readingTime} min read</span>
              </div>
            )}
          </div>
        </div>

        {/* Relevant Conditions */}
        {!isCompact && content.relevantConditions.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {content.relevantConditions.slice(0, 3).map((condition) => (
              <Badge key={condition} variant="primary" size="sm">
                {condition}
              </Badge>
            ))}
            {content.relevantConditions.length > 3 && (
              <Badge variant="default" size="sm">
                +{content.relevantConditions.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
