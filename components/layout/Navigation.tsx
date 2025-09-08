'use client';

import { Home, FileText, TrendingUp, User, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: Home,
    description: 'Overview of your health data'
  },
  { 
    id: 'content', 
    label: 'Content', 
    icon: FileText,
    description: 'Health articles and resources'
  },
  { 
    id: 'trends', 
    label: 'Trends', 
    icon: TrendingUp,
    description: 'Latest health research and alerts'
  },
  { 
    id: 'profile', 
    label: 'Profile', 
    icon: User,
    description: 'Your account and preferences'
  },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <>
      {/* Mobile Navigation - Bottom Tab Bar */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-borderLight bg-surface/95 backdrop-blur-md sm:hidden"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-around px-2 py-1 safe-area-pb">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 transition-all duration-200 rounded-lg mx-1',
                  'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1',
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-textSecondary hover:text-textPrimary hover:bg-secondary-50 active:bg-secondary-100'
                )}
                aria-label={`${tab.label} - ${tab.description}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className={cn(
                  'p-1.5 rounded-lg transition-all duration-200',
                  isActive && 'bg-primary/20'
                )}>
                  <Icon className={cn(
                    'w-5 h-5 transition-all duration-200',
                    isActive ? 'scale-110' : 'scale-100'
                  )} />
                </div>
                <span className={cn(
                  'text-xs font-medium mt-1 truncate',
                  isActive ? 'text-primary' : 'text-textSecondary'
                )}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Navigation - Sidebar */}
      <nav 
        className="hidden sm:flex sm:flex-col sm:w-64 sm:min-h-screen sm:border-r sm:border-borderLight sm:bg-surface/50 sm:backdrop-blur-sm"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-borderLight">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-textPrimary">HealthSync AI</h2>
              <p className="text-xs text-textSecondary">Health Management</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group',
                  'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-surface',
                  isActive
                    ? 'text-primary bg-primary/10 shadow-sm border border-primary/20'
                    : 'text-textSecondary hover:text-textPrimary hover:bg-secondary-50 active:bg-secondary-100'
                )}
                aria-label={`${tab.label} - ${tab.description}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className={cn(
                  'p-2 rounded-lg transition-all duration-200',
                  isActive 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-secondary-100 text-textSecondary group-hover:bg-secondary-200 group-hover:text-textPrimary'
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    'font-medium transition-colors duration-200',
                    isActive ? 'text-primary' : 'text-textPrimary'
                  )}>
                    {tab.label}
                  </div>
                  <div className="text-xs text-textTertiary truncate">
                    {tab.description}
                  </div>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-borderLight">
          <div className="text-xs text-textTertiary text-center">
            <p>HealthSync AI v1.0</p>
            <p className="mt-1">Built with ❤️ for Base</p>
          </div>
        </div>
      </nav>
    </>
  );
}
