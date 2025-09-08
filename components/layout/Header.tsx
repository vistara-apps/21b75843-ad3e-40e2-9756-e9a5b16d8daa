'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { Activity, Bell, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onOpenSymptomLog: () => void;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
}

export function Header({
  onOpenSymptomLog,
  onOpenNotifications,
  onOpenSettings,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/50 bg-surface/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-textPrimary">HealthSync AI</h1>
              <p className="text-xs text-textSecondary">Your Personalized Health Hub</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Quick Log Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenSymptomLog}
              className="hidden sm:flex"
            >
              Log Symptom
            </Button>

            {/* Notifications */}
            <button
              onClick={onOpenNotifications}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 relative"
            >
              <Bell className="w-5 h-5 text-textSecondary" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <Settings2 className="w-5 h-5 text-textSecondary" />
            </button>

            {/* Wallet Connection */}
            <Wallet>
              <ConnectWallet>
                <Name className="text-sm font-medium" />
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </div>
    </header>
  );
}
