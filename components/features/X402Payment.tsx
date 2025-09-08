'use client';

import { useState } from 'react';
import { useX402Payment, checkUSDCBalance } from '@/lib/x402-payment';
import { useWalletClient } from 'wagmi';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { CreditCard, CheckCircle, AlertCircle, Loader2, Wallet } from 'lucide-react';

interface X402PaymentProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (transactionHash: string) => void;
}

export function X402Payment({ isOpen, onClose, onPaymentSuccess }: X402PaymentProps) {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [usdcBalance, setUsdcBalance] = useState<string>('0');

  const { processPayment, isWalletConnected, isLoading } = useX402Payment();
  const { data: walletClient } = useWalletClient();

  // Check USDC balance when wallet is connected
  const handleCheckBalance = async () => {
    if (walletClient) {
      const balance = await checkUSDCBalance(walletClient);
      setUsdcBalance(balance);
    }
  };

  const handlePayment = async () => {
    if (!isWalletConnected) {
      setErrorMessage('Please connect your wallet first');
      setPaymentStatus('error');
      return;
    }

    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      const result = await processPayment();

      if (result.success && result.transactionHash) {
        setTransactionHash(result.transactionHash);
        setPaymentStatus('success');
        onPaymentSuccess(result.transactionHash);
      } else {
        setErrorMessage(result.error || 'Payment failed');
        setPaymentStatus('error');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred');
      setPaymentStatus('error');
    }
  };

  const handleClose = () => {
    setPaymentStatus('idle');
    setErrorMessage('');
    setTransactionHash('');
    onClose();
  };

  const renderPaymentContent = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-semibold text-textPrimary mb-2">Processing Payment</h3>
            <p className="text-textSecondary">
              Please confirm the transaction in your wallet and wait for confirmation...
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-textPrimary mb-2">Payment Successful!</h3>
            <p className="text-textSecondary mb-4">
              Your premium subscription has been activated.
            </p>
            {transactionHash && (
              <div className="bg-backgroundSecondary p-3 rounded-lg mb-4">
                <p className="text-sm text-textSecondary mb-1">Transaction Hash:</p>
                <p className="text-xs font-mono text-textPrimary break-all">
                  {transactionHash}
                </p>
              </div>
            )}
            <Button onClick={handleClose} className="w-full">
              Continue
            </Button>
          </div>
        );

      case 'error':
        return (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-textPrimary mb-2">Payment Failed</h3>
            <p className="text-textSecondary mb-4">{errorMessage}</p>
            <div className="space-y-2">
              <Button onClick={handlePayment} className="w-full">
                Try Again
              </Button>
              <Button onClick={handleClose} variant="secondary" className="w-full">
                Cancel
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-textPrimary mb-2">
                Upgrade to Premium
              </h3>
              <p className="text-textSecondary">
                Pay with USDC on Base network using x402 protocol
              </p>
            </div>

            {/* Payment Details */}
            <Card className="p-4 bg-backgroundSecondary">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-textSecondary">Plan:</span>
                  <span className="text-textPrimary font-medium">Premium Monthly</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSecondary">Amount:</span>
                  <span className="text-textPrimary font-medium">5.00 USDC</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSecondary">Network:</span>
                  <Badge variant="primary">Base</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSecondary">Protocol:</span>
                  <Badge variant="secondary">x402</Badge>
                </div>
              </div>
            </Card>

            {/* Wallet Status */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-4 h-4 text-textSecondary" />
                  <span className="text-textSecondary">Wallet Status:</span>
                </div>
                <Badge variant={isWalletConnected ? 'primary' : 'secondary'}>
                  {isWalletConnected ? 'Connected' : 'Not Connected'}
                </Badge>
              </div>
              
              {isWalletConnected && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-textSecondary">USDC Balance:</span>
                    <span className="text-textPrimary font-medium">{usdcBalance} USDC</span>
                  </div>
                  <Button 
                    onClick={handleCheckBalance} 
                    variant="secondary" 
                    size="sm"
                    className="w-full"
                  >
                    Refresh Balance
                  </Button>
                </div>
              )}
            </Card>

            {/* Payment Button */}
            <div className="space-y-2">
              <Button
                onClick={handlePayment}
                disabled={!isWalletConnected || isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : !isWalletConnected ? (
                  'Connect Wallet First'
                ) : (
                  'Pay 5 USDC'
                )}
              </Button>
              
              <Button onClick={handleClose} variant="secondary" className="w-full">
                Cancel
              </Button>
            </div>

            {/* Features List */}
            <div className="border-t border-borderPrimary pt-4">
              <h4 className="text-sm font-medium text-textPrimary mb-2">Premium Features:</h4>
              <ul className="text-sm text-textSecondary space-y-1">
                <li>• Advanced AI health insights</li>
                <li>• Full content library access</li>
                <li>• Priority health trend alerts</li>
                <li>• Detailed analytics dashboard</li>
                <li>• Export health data</li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="X402 Payment">
      {renderPaymentContent()}
    </Modal>
  );
}
