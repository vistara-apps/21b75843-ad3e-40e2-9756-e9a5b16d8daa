'use client';

import { useWalletClient } from 'wagmi';
import { base } from 'wagmi/chains';
import { parseUnits } from 'viem';

// USDC contract address on Base
const USDC_CONTRACT_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// X402 payment configuration
const X402_CONFIG = {
  chainId: base.id,
  tokenAddress: USDC_CONTRACT_ADDRESS,
  amount: parseUnits('5', 6), // $5 USDC (6 decimals)
  recipient: '0x742d35Cc6634C0532925a3b8D0Ea5c0b2c5d0B3e', // Replace with actual recipient address
  // Mock payment endpoint for testing
  paymentEndpoint: 'https://api.healthsync.ai/premium-subscription',
};

export interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
  paymentResponse?: any;
}

export interface X402PaymentService {
  processPayment: () => Promise<PaymentResult>;
  isWalletConnected: boolean;
  isLoading: boolean;
}

export function useX402Payment(): X402PaymentService {
  const { data: walletClient, isLoading } = useWalletClient();

  const processPayment = async (): Promise<PaymentResult> => {
    try {
      if (!walletClient) {
        return {
          success: false,
          error: 'Wallet not connected. Please connect your wallet first.',
        };
      }

      // Simulate x402 payment flow
      // In a real implementation, this would:
      // 1. Make a request to a payment-required endpoint (returns 402)
      // 2. Parse payment requirements from the 402 response
      // 3. Create payment using wallet client
      // 4. Retry request with payment headers
      
      console.log('Starting X402 payment flow...');
      console.log('Wallet connected:', walletClient.account?.address);
      console.log('Payment amount:', X402_CONFIG.amount.toString(), 'USDC');
      console.log('Recipient:', X402_CONFIG.recipient);

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful payment
      const mockTransactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      console.log('Payment processed successfully!');
      console.log('Transaction hash:', mockTransactionHash);

      return {
        success: true,
        transactionHash: mockTransactionHash,
        paymentResponse: {
          amount: X402_CONFIG.amount.toString(),
          token: X402_CONFIG.tokenAddress,
          recipient: X402_CONFIG.recipient,
          timestamp: Date.now(),
        },
      };

    } catch (error: any) {
      console.error('X402 Payment Error:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred during payment.',
      };
    }
  };

  return {
    processPayment,
    isWalletConnected: !!walletClient,
    isLoading,
  };
}

// Utility function to check USDC balance
export async function checkUSDCBalance(walletClient: any): Promise<string> {
  try {
    if (!walletClient || !walletClient.account) {
      throw new Error('Wallet client or account not available');
    }

    // For testing purposes, return a mock balance
    // In a real implementation, you would query the USDC contract
    const mockBalance = '100.50'; // Mock 100.50 USDC balance
    
    // TODO: Implement actual USDC balance check using viem
    // const balance = await walletClient.readContract({
    //   address: USDC_CONTRACT_ADDRESS,
    //   abi: erc20Abi,
    //   functionName: 'balanceOf',
    //   args: [walletClient.account.address],
    // });
    // return formatUnits(balance, 6); // USDC has 6 decimals

    return mockBalance;
  } catch (error) {
    console.error('Error checking USDC balance:', error);
    throw error;
  }
}

// Utility function to verify payment on-chain
export async function verifyPayment(transactionHash: string): Promise<boolean> {
  try {
    // This would typically involve checking the transaction on-chain
    // For now, we'll return true if we have a transaction hash
    return !!transactionHash && transactionHash.length > 0;
  } catch (error) {
    console.error('Payment verification error:', error);
    return false;
  }
}
