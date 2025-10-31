import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Static device data
const DEVICE_DATA = [
  {
    id: 1,
    name: 'Living Room Light',
    icon: '💡',
    status: true,
    type: 'light',
    location: 'Living Room',
    power: '12W'
  },
  {
    id: 2,
    name: 'Security Camera',
    icon: '📹',
    status: true,
    type: 'camera',
    location: 'Front Door',
    power: '8W'
  },
  {
    id: 3,
    name: 'Smart Door Lock',
    icon: '🔒',
    status: false,
    type: 'lock',
    location: 'Main Entrance',
    power: '3W'
  },
  {
    id: 4,
    name: 'Motion Sensor',
    icon: '🚶',
    status: true,
    type: 'sensor',
    location: 'Hallway',
    power: '1W'
  },
  {
    id: 5,
    name: 'Air Conditioning',
    icon: '❄️',
    status: false,
    type: 'climate',
    location: 'Bedroom',
    power: '1200W'
  },
  {
    id: 6,
    name: 'Smart Thermostat',
    icon: '🌡️',
    status: true,
    type: 'thermostat',
    location: 'Living Room',
    power: '5W'
  }
];

interface Device {
  id: number;
  name: string;
  icon: string;
  status: boolean;
  type: string;
  location: string;
  power: string;
}

const DeviceCard: React.FC<{ device: Device; onToggle: (id: number) => void }> = ({ device, onToggle }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="device-card"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="device-header">
        <div className="device-icon-wrapper">
          <motion.div
            className="device-icon"
            animate={{ 
              rotate: device.status ? [0, 10, -10, 0] : 0,
              scale: device.status ? [1, 1.1, 1] : 1
            }}
            transition={{ duration: 0.5 }}
          >
            {device.icon}
          </motion.div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggle(device.id)}
          className={`device-toggle ${device.status ? 'active' : 'inactive'}`}
        >
          <motion.div
            className="toggle-slider"
            animate={{ x: device.status ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.button>
      </div>
      
      <div className="device-info">
        <h3 className="device-name">{device.name}</h3>
        <p className="device-location">{device.location}</p>
        <div className="device-details">
          <span className={`device-status ${device.status ? 'online' : 'offline'}`}>
            {device.status ? 'Online' : 'Offline'}
          </span>
          <span className="device-power">{device.power}</span>
        </div>
      </div>
      
      <AnimatePresence>
        {device.status && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="device-activity"
          >
            <div className="activity-indicator">
              <motion.div
                className="pulse-dot"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Active</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Devices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>(DEVICE_DATA);

  const handleToggleDevice = (deviceId: number) => {
    setDevices(prev => 
      prev.map(device => 
        device.id === deviceId 
          ? { ...device, status: !device.status }
          : device
      )
    );
  };

  const activeDevices = devices.filter(device => device.status).length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="devices-page"
    >
      <div className="page-header">
        <div>
          <h1 className="page-title">Devices</h1>
          <p className="page-subtitle">Manage your connected home devices</p>
        </div>
        <motion.div 
          className="devices-summary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="summary-stat">
            <span className="stat-number">{activeDevices}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="summary-stat">
            <span className="stat-number">{devices.length}</span>
            <span className="stat-label">Total</span>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="devices-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {devices.map((device, index) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <DeviceCard device={device} onToggle={handleToggleDevice} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Devices;