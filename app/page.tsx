'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { Dashboard } from '@/components/features/Dashboard';
import { SymptomLogger } from '@/components/features/SymptomLogger';
import { ContentCard } from '@/components/features/ContentCard';
import { HealthTrendAlert } from '@/components/features/HealthTrendAlert';
import { X402Payment } from '@/components/features/X402Payment';
import { X402TestComponent } from '@/components/features/X402TestComponent';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { HEALTH_CONDITIONS, SUBSCRIPTION_FEATURES } from '@/lib/constants';
import { generateId } from '@/lib/utils';
import { verifyPayment } from '@/lib/x402-payment';
import type { SymptomLog, Content, HealthTrendAlert as HealthTrendAlertType, User } from '@/lib/types';

export default function HealthSyncApp() {
  const { setFrameReady } = useMiniKit();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSymptomLoggerOpen, setIsSymptomLoggerOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isX402PaymentOpen, setIsX402PaymentOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([]);
  const [content, setContent] = useState<Content[]>([]);
  const [alerts, setAlerts] = useState<HealthTrendAlertType[]>([]);

  // Initialize MiniKit
  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Handle successful x402 payment
  const handlePaymentSuccess = async (transactionHash: string) => {
    try {
      // Verify the payment on-chain
      const isVerified = await verifyPayment(transactionHash);
      
      if (isVerified && user) {
        // Update user subscription status
        const updatedUser = {
          ...user,
          subscriptionStatus: 'premium' as const,
        };
        setUser(updatedUser);
        
        // Close payment modal
        setIsX402PaymentOpen(false);
        
        // Show success message or redirect
        console.log('Payment verified and subscription upgraded!');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
    }
  };

  // Mock user data and check onboarding
  useEffect(() => {
    const mockUser: User = {
      userId: 'user_123',
      username: 'healthuser',
      email: 'user@example.com',
      selectedConditions: ['migraines', 'anxiety'],
      notificationPreferences: {
        healthTrends: true,
        symptomReminders: true,
        contentUpdates: false,
      },
      subscriptionStatus: 'free',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setUser(mockUser);

    // Check if user needs onboarding
    if (mockUser.selectedConditions.length === 0) {
      setIsOnboardingOpen(true);
    }

    // Load mock content
    const mockContent: Content[] = [
      {
        contentId: '1',
        title: 'Understanding Migraine Triggers: A Comprehensive Guide',
        url: 'https://example.com/migraine-triggers',
        type: 'article',
        summary: 'Learn about common migraine triggers and how to identify your personal patterns.',
        relevantConditions: ['migraines'],
        author: 'Dr. Emily Chen',
        publishedDate: new Date().toISOString(),
        readingTime: 7,
        isPremium: false,
      },
      {
        contentId: '2',
        title: 'Anxiety Management Techniques for Daily Life',
        url: 'https://example.com/anxiety-management',
        type: 'video',
        summary: 'Practical strategies for managing anxiety symptoms in everyday situations.',
        relevantConditions: ['anxiety'],
        publishedDate: new Date(Date.now() - 86400000).toISOString(),
        readingTime: 12,
        isPremium: true,
      },
      {
        contentId: '3',
        title: 'Latest Research: Mindfulness and Chronic Pain',
        url: 'https://example.com/mindfulness-research',
        type: 'research',
        summary: 'New study shows mindfulness meditation reduces chronic pain by 30% in participants.',
        relevantConditions: ['chronic-fatigue', 'fibromyalgia'],
        publishedDate: new Date(Date.now() - 172800000).toISOString(),
        readingTime: 5,
        isPremium: false,
      },
    ];

    setContent(mockContent);

    // Load mock alerts
    const mockAlerts: HealthTrendAlertType[] = [
      {
        alertId: '1',
        userId: mockUser.userId,
        timestamp: new Date().toISOString(),
        title: 'New Migraine Prevention Study Results',
        summary: 'Researchers find that regular exercise reduces migraine frequency by 40% in a 6-month study.',
        sourceUrl: 'https://example.com/migraine-exercise-study',
        relevanceScore: 0.92,
        category: 'research',
        isRead: false,
        priority: 'high',
      },
      {
        alertId: '2',
        userId: mockUser.userId,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        title: 'FDA Approves New Anxiety Treatment',
        summary: 'New fast-acting anxiety medication shows promise in clinical trials with fewer side effects.',
        sourceUrl: 'https://example.com/new-anxiety-treatment',
        relevanceScore: 0.85,
        category: 'treatment',
        isRead: false,
        priority: 'medium',
      },
    ];

    setAlerts(mockAlerts);
  }, []);

  const handleSaveSymptomLog = (logData: Omit<SymptomLog, 'logId' | 'userId'>) => {
    if (!user) return;

    const newLog: SymptomLog = {
      ...logData,
      logId: generateId(),
      userId: user.userId,
    };

    setSymptomLogs(prev => [newLog, ...prev]);
  };

  const handleMarkAlertAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.alertId === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.alertId !== alertId));
  };

  const handleViewSource = (url: string) => {
    window.open(url, '_blank');
  };

  const handleUpdateConditions = (conditions: string[]) => {
    if (!user) return;
    
    setUser(prev => prev ? { ...prev, selectedConditions: conditions } : null);
    setIsOnboardingOpen(false);
  };

  const filteredContent = user 
    ? content.filter(item => 
        item.relevantConditions.some(condition => 
          user.selectedConditions.includes(condition)
        ) || item.relevantConditions.length === 0
      )
    : content;

  const unreadAlerts = alerts.filter(alert => !alert.isRead);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onOpenSymptomLog={() => setIsSymptomLoggerOpen(true)} />;
      
      case 'content':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-textPrimary">Content Library</h1>
                <p className="text-textSecondary">Curated health information for your conditions</p>
              </div>
              {user?.subscriptionStatus === 'free' && (
                <Button 
                  variant="primary"
                  onClick={() => setIsX402PaymentOpen(true)}
                >
                  Upgrade to Premium
                </Button>
              )}
            </div>

            {user?.selectedConditions.length === 0 ? (
              <Card className="text-center py-8">
                <p className="text-textSecondary mb-4">
                  Select your health conditions to see personalized content
                </p>
                <Button onClick={() => setIsOnboardingOpen(true)}>
                  Select Conditions
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredContent.map((item) => (
                  <ContentCard
                    key={item.contentId}
                    content={item}
                    onClick={() => handleViewSource(item.url)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      
      case 'trends':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-textPrimary">Health Trends</h1>
              <p className="text-textSecondary">Stay updated with the latest health research and treatments</p>
            </div>

            {alerts.length === 0 ? (
              <Card className="text-center py-8">
                <p className="text-textSecondary">
                  No health trend alerts yet. We'll notify you when we find relevant updates!
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <HealthTrendAlert
                    key={alert.alertId}
                    alert={alert}
                    onMarkAsRead={handleMarkAlertAsRead}
                    onDismiss={handleDismissAlert}
                    onViewSource={handleViewSource}
                  />
                ))}
              </div>
            )}
          </div>
        );
      
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-textPrimary">Profile</h1>
              <p className="text-textSecondary">Manage your health profile and preferences</p>
            </div>

            {user && (
              <div className="space-y-6">
                {/* User Info */}
                <Card>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-textPrimary">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-textPrimary mb-1">
                          Username
                        </label>
                        <p className="text-textSecondary">{user.username}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-textPrimary mb-1">
                          Email
                        </label>
                        <p className="text-textSecondary">{user.email || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Health Conditions */}
                <Card>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-textPrimary">Health Conditions</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsOnboardingOpen(true)}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {user.selectedConditions.length > 0 ? (
                        user.selectedConditions.map((condition) => (
                          <Badge key={condition} variant="primary">
                            {HEALTH_CONDITIONS.find(c => c.id === condition)?.name || condition}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-textSecondary">No conditions selected</p>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Subscription */}
                <Card>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-textPrimary">Subscription</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant={user.subscriptionStatus === 'premium' ? 'primary' : 'secondary'}>
                          {user.subscriptionStatus.toUpperCase()}
                        </Badge>
                        <p className="text-sm text-textSecondary mt-1">
                          {user.subscriptionStatus === 'premium' 
                            ? 'You have access to all premium features'
                            : 'Upgrade to unlock premium features'
                          }
                        </p>
                      </div>
                      {user.subscriptionStatus === 'free' && (
                        <Button 
                          variant="primary"
                          onClick={() => setIsX402PaymentOpen(true)}
                        >
                          Upgrade to Premium
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="font-medium text-textPrimary mb-2">Free Features</h4>
                        <ul className="space-y-1 text-sm text-textSecondary">
                          {SUBSCRIPTION_FEATURES.free.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-textPrimary mb-2">Premium Features</h4>
                        <ul className="space-y-1 text-sm text-textSecondary">
                          {SUBSCRIPTION_FEATURES.premium.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        );
      
      case 'test':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-textPrimary">X402 Payment Testing</h1>
              <p className="text-textSecondary">Test the x402 payment integration with USDC on Base</p>
            </div>
            <X402TestComponent />
          </div>
        );
      
      default:
        return <Dashboard onOpenSymptomLog={() => setIsSymptomLoggerOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <Header
        onOpenSymptomLog={() => setIsSymptomLoggerOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <div className="flex flex-col sm:flex-row">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Symptom Logger Modal */}
      <SymptomLogger
        isOpen={isSymptomLoggerOpen}
        onClose={() => setIsSymptomLoggerOpen(false)}
        onSave={handleSaveSymptomLog}
      />

      {/* Notifications Modal */}
      <Modal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        title="Notifications"
      >
        <div className="space-y-4">
          {unreadAlerts.length > 0 ? (
            unreadAlerts.map((alert) => (
              <HealthTrendAlert
                key={alert.alertId}
                alert={alert}
                onMarkAsRead={handleMarkAlertAsRead}
                onDismiss={handleDismissAlert}
                onViewSource={handleViewSource}
              />
            ))
          ) : (
            <p className="text-textSecondary text-center py-8">
              No new notifications
            </p>
          )}
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Settings"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={user?.notificationPreferences.healthTrends}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-textPrimary">Health trend alerts</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={user?.notificationPreferences.symptomReminders}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-textPrimary">Symptom logging reminders</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={user?.notificationPreferences.contentUpdates}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-textPrimary">New content updates</span>
              </label>
            </div>
          </div>
        </div>
      </Modal>

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleUpdateConditions}
        selectedConditions={user?.selectedConditions || []}
      />

      {/* X402 Payment Modal */}
      <X402Payment
        isOpen={isX402PaymentOpen}
        onClose={() => setIsX402PaymentOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

// Onboarding Modal Component
function OnboardingModal({
  isOpen,
  onClose,
  onComplete,
  selectedConditions,
}: {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (conditions: string[]) => void;
  selectedConditions: string[];
}) {
  const [conditions, setConditions] = useState<string[]>(selectedConditions);

  const toggleCondition = (conditionId: string) => {
    setConditions(prev => 
      prev.includes(conditionId)
        ? prev.filter(id => id !== conditionId)
        : [...prev, conditionId]
    );
  };

  const handleComplete = () => {
    onComplete(conditions);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select Your Health Conditions"
      size="lg"
    >
      <div className="space-y-6">
        <p className="text-textSecondary">
          Choose the health conditions you'd like to track and receive personalized content for.
          You can always update these later.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {HEALTH_CONDITIONS.map((condition) => (
            <button
              key={condition.id}
              onClick={() => toggleCondition(condition.id)}
              className={`p-4 text-left border rounded-lg transition-all duration-200 ${
                conditions.includes(condition.id)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 hover:border-gray-300 text-textPrimary'
              }`}
            >
              <div className="font-medium">{condition.name}</div>
              <div className="text-sm text-textSecondary">{condition.category}</div>
            </button>
          ))}
        </div>

        <div className="flex space-x-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleComplete}
            disabled={conditions.length === 0}
            className="flex-1"
          >
            Save Conditions
          </Button>
        </div>
      </div>
    </Modal>
  );
}
