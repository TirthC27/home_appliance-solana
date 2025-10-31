import React from 'react';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="settings-page"
    >
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Configure your ShadowHome system</p>
      </div>
      
      <div className="coming-soon">
        <div className="coming-soon-content">
          <div className="coming-soon-icon">⚙️</div>
          <h2>System Settings</h2>
          <p>Customize your smart home experience</p>
          <div className="feature-list">
            <div className="feature-item">🔐 Security Configuration</div>
            <div className="feature-item">🎨 Theme & Appearance</div>
            <div className="feature-item">📱 Notification Preferences</div>
            <div className="feature-item">🔗 Wallet & Blockchain Settings</div>
          </div>
          <div className="status-badge">Coming Soon</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;