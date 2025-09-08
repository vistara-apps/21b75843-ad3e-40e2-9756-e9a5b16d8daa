'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-textPrimary">
              Something went wrong!
            </h2>
            <p className="text-textSecondary">
              We encountered an error while loading HealthSync AI. Please try again.
            </p>
          </div>

          <div className="space-y-2">
            <Button onClick={reset} className="w-full">
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Go Home
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className="text-left mt-4">
              <summary className="text-sm text-textSecondary cursor-pointer">
                Error Details (Development)
              </summary>
              <pre className="text-xs text-red-600 mt-2 p-2 bg-red-50 rounded overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </Card>
    </div>
  );
}
