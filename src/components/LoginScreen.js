import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext.tsx';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';

const LoginScreen = () => {
  const { connect, isConnected, authenticate, isAuthenticated, isLoading, error } = useWallet();
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(false);

  React.useEffect(() => {
    if (isConnected && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isConnected, isAuthenticated, navigate]);

  const handleConnect = async () => {
    setLocalLoading(true);
    try {
      await connect();
    } catch (err) {
      console.error('Connection failed:', err);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleAuthenticate = async () => {
    setLocalLoading(true);
    try {
      await authenticate();
    } catch (err) {
      console.error('Authentication failed:', err);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="login-screen">
      {/* Animated background particles */}
      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="login-container">
        <div className="login-card glass">
          {/* Header */}
          <div className="login-header">
            <div className="logo-section">
              <div className="logo-icon">⚡</div>
              <h1 className="logo-text neon-text">ShadowHome</h1>
              <p className="logo-subtitle">Ledger OS</p>
            </div>
            <div className="version-badge">v1.0.0</div>
          </div>

          {/* Status indicator */}
          <div className="status-section">
            <div className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></div>
            <span className="status-text">
              {isConnected ? 'Wallet Connected' : 'Wallet Disconnected'}
            </span>
          </div>

          {/* Error display */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {/* Connection steps */}
          <div className="connection-steps">
            {!isConnected ? (
              <div className="step active">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Connect Phantom Wallet</h3>
                  <p>Connect your Phantom wallet to access ShadowHome</p>
                  <button
                    onClick={handleConnect}
                    disabled={localLoading || isLoading}
                    className="cyber-button primary"
                  >
                    {localLoading || isLoading ? (
                      <>
                        <span className="spinner"></span>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <span className="button-icon">🔗</span>
                        Connect Wallet
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : !isAuthenticated ? (
              <div className="step active">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Sign Authentication</h3>
                  <p>Sign the message to verify wallet ownership</p>
                  <button
                    onClick={handleAuthenticate}
                    disabled={localLoading || isLoading}
                    className="cyber-button secondary"
                  >
                    {localLoading || isLoading ? (
                      <>
                        <span className="spinner"></span>
                        Signing...
                      </>
                    ) : (
                      <>
                        <span className="button-icon">✍️</span>
                        Sign Message
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="step complete">
                <div className="step-number">✓</div>
                <div className="step-content">
                  <h3>Authentication Complete</h3>
                  <p>Redirecting to ShadowHome dashboard...</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="login-footer">
            <p>Powered by Solana & Phantom Wallet</p>
            <div className="footer-links">
              <a href="#" className="footer-link">Security</a>
              <span>•</span>
              <a href="#" className="footer-link">Privacy</a>
              <span>•</span>
              <a href="#" className="footer-link">Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;