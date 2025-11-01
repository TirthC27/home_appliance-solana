import React from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext.tsx';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings as SettingsIcon, Shield, Palette, Bell, User } from 'lucide-react';
import '../components/ShadowHomeFooter.css';
import './Settings.css';

const Settings: React.FC = () => {
  const { disconnect } = useWallet();
  const navigate = useNavigate();

  const handleDisconnectWallet = async () => {
    try {
      await disconnect();
      navigate('/');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="settings-page"
    >
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Configure your ShadowHome system</p>
      </div>
      
      <div className="settings-content">
        {/* Wallet Section */}
        <motion.div 
          className="settings-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="section-header">
            <User className="section-icon" />
            <h3 className="section-title">Wallet Management</h3>
          </div>
          <div className="settings-grid">
            <motion.button
              className="disconnect-button"
              onClick={handleDisconnectWallet}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="button-icon" />
              <span>Disconnect Wallet</span>
            </motion.button>
          </div>
        </motion.div>

        {/* System Settings */}
        <motion.div 
          className="settings-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="section-header">
            <SettingsIcon className="section-icon" />
            <h3 className="section-title">System Configuration</h3>
          </div>
          <div className="feature-list">
            <div className="feature-item">
              <Shield className="feature-icon" />
              <span>🔐 Security Configuration</span>
            </div>
            <div className="feature-item">
              <Palette className="feature-icon" />
              <span>🎨 Theme & Appearance</span>
            </div>
            <div className="feature-item">
              <Bell className="feature-icon" />
              <span>📱 Notification Preferences</span>
            </div>
            <div className="feature-item">
              <SettingsIcon className="feature-icon" />
              <span>🔗 Wallet & Blockchain Settings</span>
            </div>
          </div>
          <div className="status-badge">Coming Soon</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;