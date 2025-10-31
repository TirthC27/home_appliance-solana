import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

// Import default styles for wallet adapter UI
import '@solana/wallet-adapter-react-ui/styles.css';

interface WalletContextType {
  isConnected: boolean;
  publicKey: string | null;
  isAuthenticated: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  authenticate: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

const WalletContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get the Phantom wallet provider
      const provider = window.phantom?.solana;
      
      if (!provider) {
        throw new Error('Phantom wallet not found');
      }

      const response = await provider.connect();
      setIsConnected(true);
      setPublicKey(response.publicKey.toString());
      
      // Auto-authenticate after connection
      await authenticate();
      
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Wallet connection error:', err);
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    try {
      const provider = window.phantom?.solana;
      if (provider) {
        provider.disconnect();
      }
      setIsConnected(false);
      setPublicKey(null);
      setIsAuthenticated(false);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to disconnect wallet');
    }
  };

  const authenticate = async () => {
    if (!publicKey) {
      throw new Error('No wallet connected');
    }

    try {
      setLoading(true);
      const provider = window.phantom?.solana;
      
      if (!provider) {
        throw new Error('Phantom wallet not found');
      }

      // Sign authentication message
      const message = `Welcome to ShadowHome Ledger OS!\n\nSign this message to authenticate your identity and access your home's brain.\n\nTimestamp: ${new Date().toISOString()}`;
      const encodedMessage = new TextEncoder().encode(message);
      
      await provider.signMessage(encodedMessage, 'utf8');
      setIsAuthenticated(true);
      
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      console.error('Authentication error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if wallet was previously connected
    const checkConnection = async () => {
      try {
        const provider = window.phantom?.solana;
        if (provider && provider.isConnected) {
          setIsConnected(true);
          setPublicKey(provider.publicKey.toString());
        }
      } catch (err) {
        console.error('Error checking wallet connection:', err);
      }
    };

    checkConnection();

    // Listen for wallet events
    const provider = window.phantom?.solana;
    if (provider) {
      provider.on('connect', (publicKey: any) => {
        setIsConnected(true);
        setPublicKey(publicKey.toString());
      });

      provider.on('disconnect', () => {
        setIsConnected(false);
        setPublicKey(null);
        setIsAuthenticated(false);
      });

      provider.on('accountChanged', (publicKey: any) => {
        if (publicKey) {
          setPublicKey(publicKey.toString());
          setIsAuthenticated(false); // Reset auth on account change
        }
      });
    }

    return () => {
      if (provider) {
        provider.removeAllListeners();
      }
    };
  }, []);

  const value: WalletContextType = {
    isConnected,
    publicKey,
    isAuthenticated,
    connect,
    disconnect,
    authenticate,
    loading,
    error,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = clusterApiUrl(network);

  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContextProvider>
            {children}
          </WalletContextProvider>
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};

// Type declaration for Phantom wallet
declare global {
  interface Window {
    phantom?: {
      solana?: {
        isPhantom: boolean;
        isConnected: boolean;
        publicKey: any;
        connect: (options?: any) => Promise<any>;
        disconnect: () => Promise<void>;
        signMessage: (message: Uint8Array, display?: string) => Promise<any>;
        on: (event: string, callback: (args: any) => void) => void;
        removeAllListeners: () => void;
      };
    };
  }
}