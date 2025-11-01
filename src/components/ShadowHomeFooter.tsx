import React from 'react';
import { motion } from 'framer-motion';

const ShadowHomeFooter: React.FC = () => {
  return (
    <motion.footer 
      className="shadowhome-footer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="footer-content">
        <motion.p
          animate={{ 
            textShadow: [
              '0 0 10px rgba(139, 92, 246, 0.3)',
              '0 0 20px rgba(139, 92, 246, 0.6)',
              '0 0 10px rgba(139, 92, 246, 0.3)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="footer-text"
        >
          © 2025 ShadowHome Ledger — Powered by Solana ⚡
        </motion.p>
        <div className="footer-divider"></div>
      </div>
    </motion.footer>
  );
};

export default ShadowHomeFooter;