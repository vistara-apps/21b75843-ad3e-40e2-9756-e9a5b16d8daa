'use client';

import { Home, FileText, TrendingUp, User, TestTube } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'trends', label: 'Trends', icon: TrendingUp },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'test', label: 'X402 Test', icon: TestTube },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="sticky bottom-0 z-40 w-full border-t border-gray-200/50 bg-surface/80 backdrop-blur-sm sm:relative sm:border-t-0 sm:border-r sm:w-64 sm:min-h-screen">
      <div className="flex sm:flex-col sm:p-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex-1 flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-1 sm:space-y-0 sm:space-x-3 p-3 sm:p-4 transition-all duration-200 rounded-none sm:rounded-lg',
                isActive
                  ? 'text-primary bg-primary/10 border-t-2 border-primary sm:border-t-0 sm:border-l-4'
                  : 'text-textSecondary hover:text-textPrimary hover:bg-gray-100'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs sm:text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
