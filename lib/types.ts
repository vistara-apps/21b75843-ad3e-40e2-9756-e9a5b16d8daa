export interface User {
  userId: string;
  username: string;
  email?: string;
  selectedConditions: string[];
  notificationPreferences: {
    healthTrends: boolean;
    symptomReminders: boolean;
    contentUpdates: boolean;
  };
  subscriptionStatus: 'free' | 'premium';
  createdAt: string;
  updatedAt: string;
}

export interface Condition {
  conditionId: string;
  name: string;
  description: string;
  associatedContentIds: string[];
  category: string;
  prevalence?: string;
}

export interface Content {
  contentId: string;
  title: string;
  url: string;
  type: 'article' | 'video' | 'research';
  summary: string;
  relevantConditions: string[];
  author?: string;
  publishedDate: string;
  readingTime?: number;
  isPremium: boolean;
}

export interface SymptomLog {
  logId: string;
  userId: string;
  timestamp: string;
  symptoms: string[];
  triggers: string[];
  treatmentResponses: {
    treatment: string;
    effectiveness: number; // 1-10 scale
  }[];
  notes?: string;
  severity: number; // 1-10 scale
  mood?: number; // 1-10 scale
}

export interface HealthTrendAlert {
  alertId: string;
  userId: string;
  timestamp: string;
  title: string;
  summary: string;
  sourceUrl: string;
  relevanceScore: number;
  category: 'research' | 'treatment' | 'lifestyle' | 'prevention';
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface SymptomPattern {
  pattern: string;
  frequency: number;
  commonTriggers: string[];
  suggestedActions: string[];
  confidence: number;
}
