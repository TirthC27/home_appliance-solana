import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Static data constants
const DASHBOARD_STATS = {
  energyUsage: 12.3,
  activeDevices: 6,
  aiRecommendations: 3,
  temperature: 22,
  securityStatus: 'Active'
};

const ENERGY_DATA = [
  { time: '00:00', usage: 8.2 },
  { time: '04:00', usage: 6.1 },
  { time: '08:00', usage: 11.5 },
  { time: '12:00', usage: 15.3 },
  { time: '16:00', usage: 18.7 },
  { time: '20:00', usage: 14.2 },
  { time: '24:00', usage: 12.3 }
];

const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const increment = value / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}{suffix}</span>;
};

const Dashboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="dashboard-page"
    >
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of your ShadowHome system</p>
      </div>
      
      <div className="dashboard-content">
        <motion.div 
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div 
            className="stat-card"
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="stat-icon energy">⚡</div>
            <div className="stat-info">
              <h3>Energy Usage</h3>
              <p className="stat-value">
                <AnimatedCounter value={DASHBOARD_STATS.energyUsage} suffix=" kWh" />
              </p>
              <span className="stat-change positive">+5.2%</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="stat-card"
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="stat-icon devices">�</div>
            <div className="stat-info">
              <h3>Active Devices</h3>
              <p className="stat-value">
                <AnimatedCounter value={DASHBOARD_STATS.activeDevices} />
              </p>
              <span className="stat-change positive">+1 new</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="stat-card"
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="stat-icon ai">🤖</div>
            <div className="stat-info">
              <h3>AI Recommendations</h3>
              <p className="stat-value">
                <AnimatedCounter value={DASHBOARD_STATS.aiRecommendations} />
              </p>
              <span className="stat-change positive">2 new</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="stat-card"
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="stat-icon temperature">🌡️</div>
            <div className="stat-info">
              <h3>Temperature</h3>
              <p className="stat-value">{DASHBOARD_STATS.temperature}°C</p>
              <span className="stat-change positive">+1°C</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="dashboard-panels"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="panel main-panel">
            <h2>Energy Usage Over Time</h2>
            <div className="activity-chart">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ENERGY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="rgba(255,255,255,0.6)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.6)"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(26, 27, 62, 0.9)',
                      border: '1px solid rgba(148, 85, 247, 0.3)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                    labelStyle={{ color: '#9945ff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="usage" 
                    stroke="#14f195"
                    strokeWidth={3}
                    dot={{ fill: '#9945ff', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#14f195', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="panel side-panel">
            <h2>Recent Events</h2>
            <div className="events-list">
              {[
                { dot: 'energy', text: 'Energy audit completed', time: '2 minutes ago' },
                { dot: 'security', text: 'Security check passed', time: '5 minutes ago' },
                { dot: 'data', text: 'Data backup complete', time: '10 minutes ago' },
                { dot: 'ai', text: 'AI optimization applied', time: '15 minutes ago' }
              ].map((event, index) => (
                <motion.div 
                  key={index}
                  className="event-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className={`event-dot ${event.dot}`}></div>
                  <div className="event-details">
                    <p>{event.text}</p>
                    <small>{event.time}</small>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;