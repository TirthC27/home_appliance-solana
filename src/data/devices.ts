// ShadowHome Devices Data - MQTT-style metrics simulation
// Static data constants for power dashboard display

export interface DeviceData {
  id: number;
  name: string;
  type: string;
  icon: string;
  power: number; // Watts
  voltage: number; // Volts
  current: number; // Amperes
  energy_today: number; // kWh today
  energy_total: number; // kWh total
  temperature: number; // Celsius
  status: 'ON' | 'OFF';
  last_seen: string;
}

export const devicesData: DeviceData[] = [
  {
    id: 1,
    name: "Smart Light - Living Room",
    type: "Light",
    icon: "lightbulb",
    power: 42.5,
    voltage: 230,
    current: 0.18,
    energy_today: 0.92,
    energy_total: 312.4,
    temperature: 38,
    status: "ON",
    last_seen: "2025-10-30 14:22",
  },
  {
    id: 2,
    name: "Smart Plug - Refrigerator",
    type: "Appliance",
    icon: "plug",
    power: 96.2,
    voltage: 229,
    current: 0.42,
    energy_today: 1.75,
    energy_total: 420.9,
    temperature: 36,
    status: "ON",
    last_seen: "2025-10-30 13:58",
  },
  {
    id: 3,
    name: "Security Camera - Garage",
    type: "Camera",
    icon: "camera",
    power: 12.4,
    voltage: 230,
    current: 0.05,
    energy_today: 0.45,
    energy_total: 182.7,
    temperature: 41,
    status: "ON",
    last_seen: "2025-10-30 14:12",
  },
  {
    id: 4,
    name: "Air Conditioner - Bedroom",
    type: "AC",
    icon: "wind",
    power: 720,
    voltage: 231,
    current: 3.12,
    energy_today: 3.2,
    energy_total: 1220.3,
    temperature: 44,
    status: "OFF",
    last_seen: "2025-10-30 11:32",
  },
  {
    id: 5,
    name: "Smart TV - Entertainment Center",
    type: "Entertainment",
    icon: "tv",
    power: 125.8,
    voltage: 230,
    current: 0.55,
    energy_today: 2.1,
    energy_total: 890.6,
    temperature: 42,
    status: "ON",
    last_seen: "2025-10-30 14:18",
  },
  {
    id: 6,
    name: "Smart Thermostat - Main Hall",
    type: "Climate",
    icon: "thermometer",
    power: 8.2,
    voltage: 230,
    current: 0.04,
    energy_today: 0.15,
    energy_total: 95.3,
    temperature: 35,
    status: "ON",
    last_seen: "2025-10-30 14:20",
  }
];

// Device summary statistics
export const devicesSummary = {
  total_devices: devicesData.length,
  active_devices: devicesData.filter(device => device.status === 'ON').length,
  total_power: devicesData.reduce((sum, device) => sum + (device.status === 'ON' ? device.power : 0), 0),
  total_energy_today: devicesData.reduce((sum, device) => sum + device.energy_today, 0),
  average_temperature: Math.round(devicesData.reduce((sum, device) => sum + device.temperature, 0) / devicesData.length)
};