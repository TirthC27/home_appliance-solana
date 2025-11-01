import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, 
  Plug, 
  Camera, 
  Wind, 
  Tv, 
  Thermometer,
  Zap, 
  Gauge, 
  Battery,
  Activity,
  Clock,
  ThermometerSun,
  Power,
  TrendingUp
} from 'lucide-react';
import { devicesData, devicesSummary, DeviceData } from '../data/devices.ts';
import './PowerDevices.css';

// Icon mapping for device types
const getDeviceIcon = (iconType: string) => {
  const iconMap = {
    lightbulb: Lightbulb,
    plug: Plug,
    camera: Camera,
    wind: Wind,
    tv: Tv,
    thermometer: Thermometer
  };
  const IconComponent = iconMap[iconType as keyof typeof iconMap] || Power;
  return <IconComponent size={24} />;
};

const DeviceCard: React.FC<{ device: DeviceData; onToggle: (id: number) => void }> = ({ device, onToggle }) => {
  const isActive = device.status === 'ON';
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="power-device-card"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Device Header */}
      <div className="power-device-header">
        <div className="device-icon-container">
          <motion.div
            className={`power-device-icon ${isActive ? 'active' : 'inactive'}`}
            animate={{ 
              scale: isActive ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 3 }}
          >
            {getDeviceIcon(device.icon)}
          </motion.div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggle(device.id)}
          className={`power-toggle ${isActive ? 'active' : 'inactive'}`}
        >
          <motion.div
            className="power-toggle-slider"
            animate={{ x: isActive ? 24 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <Power size={12} className="toggle-icon" />
        </motion.button>
      </div>
      
      {/* Device Info */}
      <div className="power-device-info">
        <h3 className="power-device-name">{device.name}</h3>
        <p className="power-device-type">{device.type}</p>
        
        <div className={`power-status-badge ${isActive ? 'online' : 'offline'}`}>
          <motion.div
            className="status-indicator"
            animate={{ 
              scale: isActive ? [1, 1.2, 1] : 1,
              opacity: isActive ? [1, 0.7, 1] : 0.5
            }}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          />
          {device.status}
        </div>
      </div>
      
      {/* Power Metrics */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="power-metrics"
          >
            <div className="metrics-grid">
              <div className="metric-item">
                <Zap size={14} className="metric-icon power" />
                <span className="metric-value">{device.power}W</span>
                <span className="metric-label">Power</span>
              </div>
              
              <div className="metric-item">
                <Gauge size={14} className="metric-icon voltage" />
                <span className="metric-value">{device.voltage}V</span>
                <span className="metric-label">Voltage</span>
              </div>
              
              <div className="metric-item">
                <Activity size={14} className="metric-icon current" />
                <span className="metric-value">{device.current}A</span>
                <span className="metric-label">Current</span>
              </div>
              
              <div className="metric-item">
                <Battery size={14} className="metric-icon energy" />
                <span className="metric-value">{device.energy_today}</span>
                <span className="metric-label">kWh Today</span>
              </div>
              
              <div className="metric-item">
                <TrendingUp size={14} className="metric-icon total" />
                <span className="metric-value">{device.energy_total}</span>
                <span className="metric-label">Total kWh</span>
              </div>
              
              <div className="metric-item">
                <ThermometerSun size={14} className="metric-icon temp" />
                <span className="metric-value">{device.temperature}°C</span>
                <span className="metric-label">Temp</span>
              </div>
            </div>
            
            <div className="last-seen">
              <Clock size={12} />
              <span>Last seen: {device.last_seen}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Devices: React.FC = () => {
  const [devices, setDevices] = useState<DeviceData[]>(devicesData);

  const handleToggleDevice = (deviceId: number) => {
    setDevices(prev => 
      prev.map(device => 
        device.id === deviceId 
          ? { ...device, status: device.status === 'ON' ? 'OFF' : 'ON' }
          : device
      )
    );
  };

  const activeDevices = devices.filter(device => device.status === 'ON').length;
  const totalPower = devices.reduce((sum, device) => sum + (device.status === 'ON' ? device.power : 0), 0);
  const totalEnergyToday = devices.reduce((sum, device) => sum + device.energy_today, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="power-devices-page"
    >
      <div className="page-header">
        <div>
          <h1 className="page-title">Power Dashboard</h1>
          <p className="page-subtitle">Real-time IoT device monitoring & control</p>
        </div>
        <motion.div 
          className="power-summary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="power-summary-card">
            <Zap size={18} className="summary-icon" />
            <div className="summary-data">
              <span className="summary-value">{totalPower.toFixed(1)}W</span>
              <span className="summary-label">Total Power</span>
            </div>
          </div>
          
          <div className="power-summary-card">
            <Activity size={18} className="summary-icon" />
            <div className="summary-data">
              <span className="summary-value">{activeDevices}/{devices.length}</span>
              <span className="summary-label">Active</span>
            </div>
          </div>
          
          <div className="power-summary-card">
            <Battery size={18} className="summary-icon" />
            <div className="summary-data">
              <span className="summary-value">{totalEnergyToday.toFixed(1)}</span>
              <span className="summary-label">kWh Today</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="power-devices-grid"
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