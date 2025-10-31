import React, { useState, useEffect } from 'react';
import './Dashboard2.css';

const Dashboard = ({ publicKey, onLogout }) => {
  const [selectedView, setSelectedView] = useState('portfolio');
  const [portfolioTokens] = useState([
    {
      symbol: 'SOL',
      name: 'Solana',
      balance: '12.547',
      value: '$2,327.00',
      change: '+5.2%',
      icon: '⚡',
      color: '#9945FF'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '1,250.00',
      value: '$1,250.00',
      change: '0.0%',
      icon: '💵',
      color: '#2775CA'
    },
    {
      symbol: 'RAY',
      name: 'Raydium',
      balance: '45.23',
      value: '$387.45',
      change: '+12.8%',
      icon: '🌊',
      color: '#00D4E6'
    },
    {
      symbol: 'BONK',
      name: 'Bonk',
      balance: '125,000',
      value: '$156.25',
      change: '-3.2%',
      icon: '🔥',
      color: '#FF6B35'
    }
  ]);

  const [recentActivities] = useState([
    {
      type: 'swap',
      description: 'Swapped 2.5 SOL for 487.50 USDC',
      time: '2 hours ago',
      status: 'completed',
      icon: '�'
    },
    {
      type: 'receive',
      description: 'Received 0.5 SOL',
      time: '5 hours ago',
      status: 'completed',
      icon: '📥'
    },
    {
      type: 'send',
      description: 'Sent 100 USDC to wallet',
      time: '1 day ago',
      status: 'completed',
      icon: '📤'
    },
    {
      type: 'stake',
      description: 'Staked 5.0 SOL',
      time: '2 days ago',
      status: 'completed',
      icon: '🏦'
    }
  ]);

  const [totalBalance] = useState('$4,120.70');
  const [totalChange] = useState('+8.4%');

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const renderPortfolioSection = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h3>Portfolio Tokens</h3>
        <div className="filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Tokens</button>
          <button className="filter-btn">NFTs</button>
        </div>
      </div>
      <div className="portfolio-grid">
        {portfolioTokens.map((token, index) => (
          <div key={index} className="token-card">
            <div className="token-header">
              <div className="token-info">
                <span className="token-icon" style={{color: token.color}}>
                  {token.icon}
                </span>
                <div>
                  <div className="token-symbol">{token.symbol}</div>
                  <div className="token-name">{token.name}</div>
                </div>
              </div>
              <div className="token-value">
                <div className="value">{token.value}</div>
                <div className={`change ${token.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {token.change}
                </div>
              </div>
            </div>
            <div className="token-balance">
              Balance: {token.balance} {token.symbol}
            </div>
            <div className="token-actions">
              <button className="action-btn send">Send</button>
              <button className="action-btn swap">Swap</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivitySection = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h3>Recent Activity</h3>
        <button className="view-all-btn">View All</button>
      </div>
      <div className="activity-list">
        {recentActivities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-icon">{activity.icon}</div>
            <div className="activity-details">
              <div className="activity-description">{activity.description}</div>
              <div className="activity-time">{activity.time}</div>
            </div>
            <div className={`activity-status ${activity.status}`}>
              {activity.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStatsCards = () => (
    <div className="stats-grid">
      <div className="stat-card balance-card">
        <div className="stat-header">
          <span className="stat-icon">💰</span>
          <span className="stat-label">Total Balance</span>
        </div>
        <div className="stat-value">{totalBalance}</div>
        <div className="stat-change positive">{totalChange} (24h)</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-icon">📈</span>
          <span className="stat-label">Portfolio Growth</span>
        </div>
        <div className="stat-value">+$247.32</div>
        <div className="stat-change positive">+6.4% (7d)</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-icon">⚡</span>
          <span className="stat-label">Staking Rewards</span>
        </div>
        <div className="stat-value">2.4 SOL</div>
        <div className="stat-change positive">+5.2% APY</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-icon">🔄</span>
          <span className="stat-label">Transactions</span>
        </div>
        <div className="stat-value">24</div>
        <div className="stat-change neutral">This month</div>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">👻</span>
            <span className="logo-text">Phantom</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${selectedView === 'portfolio' ? 'active' : ''}`}
            onClick={() => setSelectedView('portfolio')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Portfolio</span>
          </button>
          <button 
            className={`nav-item ${selectedView === 'activity' ? 'active' : ''}`}
            onClick={() => setSelectedView('activity')}
          >
            <span className="nav-icon">📋</span>
            <span className="nav-text">Activity</span>
          </button>
          <button 
            className={`nav-item ${selectedView === 'staking' ? 'active' : ''}`}
            onClick={() => setSelectedView('staking')}
          >
            <span className="nav-icon">🏦</span>
            <span className="nav-text">Staking</span>
          </button>
          <button 
            className={`nav-item ${selectedView === 'nfts' ? 'active' : ''}`}
            onClick={() => setSelectedView('nfts')}
          >
            <span className="nav-icon">🎨</span>
            <span className="nav-text">NFTs</span>
          </button>
          <button 
            className={`nav-item ${selectedView === 'settings' ? 'active' : ''}`}
            onClick={() => setSelectedView('settings')}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Settings</span>
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-text">Logout</span>
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="header-left">
            <h1>Solana Dashboard</h1>
            <p className="wallet-address">
              <span className="address-label">Wallet:</span>
              <span className="address-value">{formatAddress(publicKey)}</span>
              <button className="copy-btn" title="Copy address">📋</button>
            </p>
          </div>
          <div className="header-right">
            <div className="user-menu">
              <div className="user-avatar">
                <span>👤</span>
              </div>
              <div className="user-info">
                <div className="user-name">Phantom User</div>
                <div className="user-status">Connected</div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-main">
          {renderStatsCards()}
          
          <div className="dashboard-grid">
            <div className="grid-left">
              {selectedView === 'portfolio' && renderPortfolioSection()}
              {selectedView === 'activity' && renderActivitySection()}
              {selectedView === 'staking' && (
                <div className="dashboard-section">
                  <h3>Staking Overview</h3>
                  <div className="staking-cards">
                    <div className="staking-card">
                      <h4>Currently Staked</h4>
                      <div className="staking-amount">5.0 SOL</div>
                      <div className="staking-reward">+0.25 SOL earned</div>
                    </div>
                    <div className="staking-card">
                      <h4>Available to Stake</h4>
                      <div className="staking-amount">7.5 SOL</div>
                      <button className="stake-btn">Stake Now</button>
                    </div>
                  </div>
                </div>
              )}
              {selectedView === 'nfts' && (
                <div className="dashboard-section">
                  <h3>NFT Collection</h3>
                  <div className="nft-grid">
                    <div className="nft-placeholder">
                      <span>🎨</span>
                      <p>Your NFTs will appear here</p>
                    </div>
                  </div>
                </div>
              )}
              {selectedView === 'settings' && (
                <div className="dashboard-section">
                  <h3>Settings</h3>
                  <div className="settings-list">
                    <div className="setting-item">
                      <span>🔒 Security</span>
                      <button className="setting-btn">Configure</button>
                    </div>
                    <div className="setting-item">
                      <span>🌐 Network</span>
                      <button className="setting-btn">Mainnet</button>
                    </div>
                    <div className="setting-item">
                      <span>🎨 Theme</span>
                      <button className="setting-btn">Dark</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid-right">
              <div className="dashboard-section">
                <h3>Quick Actions</h3>
                <div className="quick-actions">
                  <button className="quick-action">
                    <span className="action-icon">📤</span>
                    <span>Send</span>
                  </button>
                  <button className="quick-action">
                    <span className="action-icon">📥</span>
                    <span>Receive</span>
                  </button>
                  <button className="quick-action">
                    <span className="action-icon">🔄</span>
                    <span>Swap</span>
                  </button>
                  <button className="quick-action">
                    <span className="action-icon">💎</span>
                    <span>Buy</span>
                  </button>
                </div>
              </div>
              
              <div className="dashboard-section">
                <h3>Market Overview</h3>
                <div className="market-list">
                  <div className="market-item">
                    <div className="market-symbol">SOL/USD</div>
                    <div className="market-price">$185.42</div>
                    <div className="market-change positive">+2.4%</div>
                  </div>
                  <div className="market-item">
                    <div className="market-symbol">RAY/USD</div>
                    <div className="market-price">$8.56</div>
                    <div className="market-change negative">-1.2%</div>
                  </div>
                  <div className="market-item">
                    <div className="market-symbol">ORCA/USD</div>
                    <div className="market-price">$3.42</div>
                    <div className="market-change positive">+5.1%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;