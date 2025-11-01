import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Smartphone, 
  Calendar, 
  Brain, 
  Bot,
  Settings as SettingsIcon, 
  Menu, 
  X, 
  LogOut,
  User
} from 'lucide-react';
import { useWallet } from '../contexts/WalletContext.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import Devices from '../pages/Devices.tsx';
import Events from '../pages/Events.tsx';
import AIInsights from '../pages/AIInsights.tsx';
import AiComm from '../pages/AiComm.tsx';
import Settings from '../pages/Settings.tsx';
import './DashboardLayout.css';
import './ShadowHomeFooter.css';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  key: string;
}

const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { publicKey, disconnect } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: <Home className="nav-icon" />, label: 'Dashboard', path: '/dashboard', key: 'dashboard' },
    { icon: <Smartphone className="nav-icon" />, label: 'Devices', path: '/dashboard/devices', key: 'devices' },
    { icon: <Calendar className="nav-icon" />, label: 'Events', path: '/dashboard/events', key: 'events' },
    { icon: <Brain className="nav-icon" />, label: 'AI Insights', path: '/dashboard/ai-insights', key: 'ai-insights' },
    { icon: <Bot className="nav-icon" />, label: 'MirrorMesh AI Communication', path: '/dashboard/ai-comm', key: 'ai-comm' },
    { icon: <SettingsIcon className="nav-icon" />, label: 'Settings', path: '/dashboard/settings', key: 'settings' },
  ];

  const handleLogout = () => {
    disconnect();
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="dashboard-layout">
      {/* Solana Logo Glow Line */}
      <div className="solana-glow-line">
        <div className="glow-gradient"></div>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: sidebarCollapsed ? '80px' : '280px',
          transition: { duration: 0.3, ease: 'easeInOut' }
        }}
        className="sidebar"
      >
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSidebar}
            className="sidebar-toggle"
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </motion.button>
          
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="sidebar-logo"
              >
                <span className="logo-text">ShadowHome</span>
                <span className="logo-subtitle">Ledger OS</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
                           (item.path === '/dashboard' && location.pathname === '/dashboard');
            
            return (
              <motion.button
                key={item.key}
                whileHover={{ x: sidebarCollapsed ? 0 : 8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(item.path)}
                className={`nav-item ${isActive ? 'active' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <div className="nav-icon-wrapper">
                  {item.icon}
                </div>
                
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="nav-label"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="active-indicator"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Wallet Info */}
        <div className="sidebar-footer">
          <div className="wallet-info">
            <div className="wallet-avatar">
              <User size={sidebarCollapsed ? 16 : 20} />
            </div>
            
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="wallet-details"
                >
                  <span className="wallet-status">Connected</span>
                  <span className="wallet-address">
                    {publicKey ? formatWalletAddress(publicKey) : ''}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className={`logout-btn ${sidebarCollapsed ? 'collapsed' : ''}`}
            title={sidebarCollapsed ? 'Disconnect' : ''}
          >
            <LogOut size={sidebarCollapsed ? 16 : 18} />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  Disconnect
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="welcome-section">
            <h1 className="welcome-title">
              Welcome, {publicKey ? formatWalletAddress(publicKey) : 'User'}
            </h1>
            <p className="welcome-subtitle">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="top-bar-actions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="logout-button"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </motion.button>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="devices" element={<Devices />} />
              <Route path="events" element={<Events />} />
              <Route path="ai-insights" element={<AIInsights />} />
              <Route path="ai-comm" element={<AiComm />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
        </div>
        
        {/* Footer for all pages */}
        
      </main>
    </div>
  );
};

export default DashboardLayout;