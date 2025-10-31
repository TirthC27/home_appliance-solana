import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext.tsx';
import { useNavigate } from 'react-router-dom';
import './ShadowHomeDashboard.css';
import {
  Home,
  Activity,
  TrendingUp,
  Calendar,
  Settings,
  LogOut,
  Search,
  Bell,
  User,
  Wifi,
  Thermometer,
  Lock,
  Zap,
  Shield,
  Database,
  ChevronDown,
  BarChart3,
  Clock,
  DollarSign,
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  badge?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive, onClick, badge }) => (
  <motion.button
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`sidebar-item ${isActive ? 'active' : ''}`}
  >
    <span className="sidebar-item-icon">{icon}</span>
    <span className="sidebar-item-label">{label}</span>
    {badge && (
      <span className="sidebar-item-badge">
        {badge}
      </span>
    )}
  </motion.button>
);

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, icon, color }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="stat-card"
  >
    <div className={`stat-card-glow ${color}`} />
    
    <div style={{ position: 'relative', zIndex: 10 }}>
      <div className="stat-card-header">
        <div className={`stat-card-icon ${color}`}>
          {icon}
        </div>
        <span className="stat-card-change">{change}</span>
      </div>
      <h3 className="stat-card-title">{title}</h3>
      <p className="stat-card-value">{value}</p>
    </div>
  </motion.div>
);

const ActivityItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  status: 'success' | 'warning' | 'error';
}> = ({ icon, title, description, time, status }) => {
  const statusColors = {
    success: 'text-neon-green',
    warning: 'text-yellow-400',
    error: 'text-red-400',
  };

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex items-center p-4 rounded-lg bg-cyber-dark/30 border border-white/5 hover:border-white/10 transition-all duration-200"
    >
      <div className={`p-2 rounded-lg bg-white/5 mr-4 ${statusColors[status]}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-white text-sm font-medium">{title}</h4>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>
      <span className="text-gray-500 text-xs">{time}</span>
    </motion.div>
  );
};

const ShadowHomeDashboard: React.FC = () => {
  const { publicKey, disconnect } = useWallet();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogout = () => {
    disconnect();
    navigate('/');
  };

  const sidebarItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', key: 'dashboard' },
    { icon: <Activity className="w-5 h-5" />, label: 'Activity', key: 'activity', badge: '12' },
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Portfolio', key: 'portfolio' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Events', key: 'events' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics', key: 'analytics' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', key: 'settings' },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sidebar"
      >
        {/* Logo */}
        <div className="sidebar-logo">
          <motion.div
            animate={{ 
              textShadow: [
                '0 0 20px rgba(139, 92, 246, 0.5)',
                '0 0 30px rgba(139, 92, 246, 0.8)',
                '0 0 20px rgba(139, 92, 246, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="logo-text pulse-glow"
          >
            ShadowHome OS
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              isActive={activeSection === item.key}
              onClick={() => setActiveSection(item.key)}
              badge={item.badge}
            />
          ))}
        </nav>

        {/* User section */}
        <div className="sidebar-user">
          <div className="user-info">
            <div className="user-avatar">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="user-details">
              <h4>Connected</h4>
              <p>
                {publicKey ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}` : ''}
              </p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="disconnect-btn"
          >
            <LogOut className="w-4 h-4 mr-3" />
            <span>Disconnect</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="header"
        >
          <div className="header-content">
            <div className="header-title">
              <h1>ShadowHome Activity Dashboard</h1>
              <p>Monitor your home's vital signs and blockchain activity</p>
            </div>
            
            <div className="header-actions">
              {/* Search */}
              <div className="search-box">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                />
              </div>
              
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="notification-btn"
              >
                <Bell className="w-5 h-5" />
                <span className="notification-badge"></span>
              </motion.button>
              
              {/* User menu */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="user-menu"
              >
                <div className="user-menu-avatar"></div>
                <ChevronDown className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Content */}
        <main className="dashboard-main">
          {/* Stats Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="stats-grid"
          >
            <StatCard
              title="Home Energy"
              value="2.4 kW"
              change="+5.2%"
              icon={<Zap className="w-5 h-5" style={{ color: '#facc15' }} />}
              color="energy"
            />
            <StatCard
              title="Security Status"
              value="Active"
              change="100%"
              icon={<Shield className="w-5 h-5" style={{ color: '#10b981' }} />}
              color="security"
            />
            <StatCard
              title="Temperature"
              value="22°C"
              change="+1°C"
              icon={<Thermometer className="w-5 h-5" style={{ color: '#60a5fa' }} />}
              color="temperature"
            />
            <StatCard
              title="Data Synced"
              value="98.7%"
              change="+2.1%"
              icon={<Database className="w-5 h-5" style={{ color: '#a855f7' }} />}
              color="data"
            />
          </motion.div>

          <div className="content-grid">
            {/* Main Activity Panel */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="activity-panel">
                <div className="activity-header">
                  <h2>System Activity</h2>
                  <div className="activity-tabs">
                    <button className="activity-tab active">
                      Real-time
                    </button>
                    <button className="activity-tab inactive">
                      Historical
                    </button>
                  </div>
                </div>

                {/* Activity Chart Placeholder */}
                <div className="activity-chart">
                  <div className="chart-placeholder">
                    <BarChart3 className="w-12 h-12" style={{ color: '#a855f7', margin: '0 auto 8px' }} />
                    <h3>Real-time Activity Graph</h3>
                    <p>Live home metrics visualization</p>
                  </div>
                </div>

                {/* Portfolio Tokens Section */}
                <div className="tokens-section">
                  <h3>Home Tokens</h3>
                  
                  <div className="tokens-grid">
                    <div className="token-card">
                      <div className="token-header">
                        <div className="token-info">
                          <div className="token-avatar energy">
                            <span>E</span>
                          </div>
                          <div className="token-details">
                            <h4>Energy Token</h4>
                            <p>4.377 ENERGY</p>
                          </div>
                        </div>
                        <button className="token-withdraw">
                          Withdraw
                        </button>
                      </div>
                      <p className="token-value">$25,346.55</p>
                    </div>

                    <div className="token-card">
                      <div className="token-header">
                        <div className="token-info">
                          <div className="token-avatar security">
                            <span>S</span>
                          </div>
                          <div className="token-details">
                            <h4>Security Token</h4>
                            <p>2.200 SECURE</p>
                          </div>
                        </div>
                        <button className="token-withdraw">
                          Withdraw
                        </button>
                      </div>
                      <p className="token-value">$1,468.37</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Sidebar */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="right-sidebar"
            >
              {/* Recent Events */}
              <div className="events-panel">
                <div className="events-header">
                  <h3>Expected Events</h3>
                  <div className="events-tabs">
                    <button className="events-tab inactive">
                      All time
                    </button>
                    <button className="events-tab active">
                      Weekly
                    </button>
                  </div>
                </div>
                
                <div className="events-list">
                  <div className="event-item">
                    <div className="event-info">
                      <div className="event-indicator energy"></div>
                      <div className="event-details">
                        <h4>Energy audit</h4>
                        <p>$10.31</p>
                      </div>
                    </div>
                    <div className="event-meta">
                      <div className="event-status energy">
                        New
                      </div>
                      <div className="event-volume">507.2M</div>
                    </div>
                  </div>

                  <div className="event-item">
                    <div className="event-info">
                      <div className="event-indicator security"></div>
                      <div className="event-details">
                        <h4>Security check</h4>
                        <p>$10.31</p>
                      </div>
                    </div>
                    <div className="event-meta">
                      <div className="event-status security">
                        New
                      </div>
                      <div className="event-volume">507.2M</div>
                    </div>
                  </div>

                  <div className="event-item">
                    <div className="event-info">
                      <div className="event-indicator data"></div>
                      <div className="event-details">
                        <h4>Data backup</h4>
                        <p>$10.31</p>
                      </div>
                    </div>
                    <div className="event-meta">
                      <div className="event-status data">
                        New
                      </div>
                      <div className="event-volume">507.2M</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Widget */}
              <div className="calendar-widget">
                <h3>Calendar</h3>
                <div className="calendar-grid">
                  {/* Calendar header */}
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                    <div key={day} className="calendar-header">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 6; // Adjust for starting day
                    const isCurrentMonth = day > 0 && day <= 31;
                    const isToday = day === 31; // Today is Oct 31, 2025
                    
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        className={`calendar-day ${
                          isToday
                            ? 'today'
                            : isCurrentMonth
                            ? 'current-month'
                            : 'other-month'
                        }`}
                      >
                        {isCurrentMonth ? day : ''}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShadowHomeDashboard;