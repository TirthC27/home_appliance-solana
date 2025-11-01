import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, User, Zap } from 'lucide-react';

interface EventLog {
  id: string;
  timestamp: string;
  name: string;
  signer: string;
  verified: boolean;
  type: 'auth' | 'transaction' | 'device' | 'system';
  details: string;
}

const EVENT_LOGS: EventLog[] = [
  {
    id: 'evt-001',
    timestamp: '2024-01-20 14:32:18',
    name: 'Smart Lock Authentication',
    signer: '5K8rE...Hx9w',
    verified: true,
    type: 'auth',
    details: 'Biometric authentication successful'
  },
  {
    id: 'evt-002',
    timestamp: '2024-01-20 14:28:45',
    name: 'Energy Meter Reading',
    signer: '7QmP...k4Yz',
    verified: true,
    type: 'device',
    details: 'Recorded 2.47 kWh consumption'
  },
  {
    id: 'evt-003',
    timestamp: '2024-01-20 14:15:22',
    name: 'System Health Check',
    signer: 'SYSd...m8Nb',
    verified: true,
    type: 'system',
    details: 'All devices operational'
  },
  {
    id: 'evt-004',
    timestamp: '2024-01-20 13:58:11',
    name: 'Temperature Sensor Alert',
    signer: '9Rt5...Cc2f',
    verified: true,
    type: 'device',
    details: 'Temperature exceeded threshold: 28°C'
  },
  {
    id: 'evt-005',
    timestamp: '2024-01-20 13:45:33',
    name: 'Security Transaction',
    signer: '4Wz8...Qq7k',
    verified: true,
    type: 'transaction',
    details: 'Access granted to guest user'
  },
  {
    id: 'evt-006',
    timestamp: '2024-01-20 13:22:07',
    name: 'Climate Control Update',
    signer: '6Hr9...Pp5m',
    verified: true,
    type: 'device',
    details: 'HVAC schedule modified'
  },
  {
    id: 'evt-007',
    timestamp: '2024-01-20 12:58:44',
    name: 'User Authentication',
    signer: '3Nm2...Dd8v',
    verified: true,
    type: 'auth',
    details: 'Multi-factor authentication completed'
  },
  {
    id: 'evt-008',
    timestamp: '2024-01-20 12:35:19',
    name: 'Light System Control',
    signer: '8Jk4...Ff1x',
    verified: true,
    type: 'device',
    details: 'Automated lighting schedule activated'
  }
];

const getEventIcon = (type: string) => {
  switch (type) {
    case 'auth': return <Shield className="w-4 h-4" />;
    case 'transaction': return <User className="w-4 h-4" />;
    case 'device': return <Zap className="w-4 h-4" />;
    case 'system': return <Clock className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

const Events: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="events-page"
    >
      <div className="page-header">
        <div>
          <h1 className="page-title">Event History</h1>
          <p className="page-subtitle">Cryptographically signed transaction logs and device events</p>
        </div>
      </div>

      <motion.div 
        className="events-table"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="table-header">
          <h2>Recent Activity</h2>
        </div>
        <div className="table-content">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Event</th>
                <th>Signer</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {EVENT_LOGS.map((event, index) => (
                <motion.tr
                  key={event.id}
                  className="event-row"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.2 + (index * 0.05)
                  }}
                >
                  <td>
                    <div className="event-time">{event.timestamp}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#9945ff' }}>
                        {getEventIcon(event.type)}
                      </span>
                      <span className="event-name">{event.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="event-signer">{event.signer}</span>
                  </td>
                  <td>
                    {event.verified && (
                      <div className="verified-badge">
                        <Shield className="verified-icon" />
                        Verified
                      </div>
                    )}
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-tertiary)' }}>{event.details}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Events;