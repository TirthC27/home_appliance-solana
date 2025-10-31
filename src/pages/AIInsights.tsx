import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Lightbulb, BarChart2 } from 'lucide-react';

type Insight = {
  id: string;
  title: string;
  text: string;
  icon: 'zap' | 'bulb' | 'chart';
};

const INSIGHTS: Insight[] = [
  {
    id: 'ins-001',
    title: 'Energy Optimization Suggestion',
    text: 'Shift high-consumption routines to off-peak hours and enable adaptive thermostat scheduling to save up to 12% monthly.',
    icon: 'chart'
  },
  {
    id: 'ins-002',
    title: 'Security Recommendation',
    text: 'Enable timed lock auto-engage when the home is empty and activate door camera motion alerts for unrecognized faces.',
    icon: 'zap'
  },
  {
    id: 'ins-003',
    title: 'Comfort Automation',
    text: 'Create a morning scene that gradually increases temperature and lighting over 20 minutes to reduce peak HVAC draws.',
    icon: 'bulb'
  }
];

function Typewriter({ text, speed = 20 }: { text: string; speed?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    if (!text) return;
    const id = setInterval(() => {
      setIndex((i) => {
        if (i >= text.length) {
          clearInterval(id);
          return text.length;
        }
        return i + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return <span className="typing-text">{text.slice(0, index)}</span>;
}

const AIInsights: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="ai-insights-page"
    >
      <div className="page-header">
        <h1 className="page-title">AI Insights</h1>
        <p className="page-subtitle">Intelligent analysis and actionable recommendations</p>
      </div>

      <div className="ai-insights-content">
        {INSIGHTS.map((insight, idx) => (
          <motion.div
            key={insight.id}
            className="insight-card"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.12 * idx }}
          >
            <div className="insight-header">
              <div className="insight-icon">
                {insight.icon === 'zap' && <Zap />}
                {insight.icon === 'bulb' && <Lightbulb />}
                {insight.icon === 'chart' && <BarChart2 />}
              </div>
              <div>
                <h3 className="insight-title">{insight.title}</h3>
              </div>
            </div>

            <div className="insight-content">
              <Typewriter text={insight.text} speed={18} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIInsights;