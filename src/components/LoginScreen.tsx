import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import { Wallet, Shield, Zap } from 'lucide-react';

const ParticleBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-purple rounded-full opacity-20"
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight,
          }}
        />
      ))}
      
      {/* Glowing orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-cyber-violet to-cyber-pink opacity-10"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

const LoginScreen: React.FC = () => {
  const { connect, loading, error } = useWallet();
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      await connect();
      // Navigate to dashboard after successful connection and authentication
      navigate('/dashboard');
    } catch (err) {
      console.error('Connection failed:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-navy via-cyber-dark to-cyber-blue relative overflow-hidden">
      <ParticleBackground />
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full"
        >
          {/* Glass card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Logo and title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center mb-8"
            >
              <motion.div
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(139, 92, 246, 0.5)',
                    '0 0 30px rgba(139, 92, 246, 0.8)',
                    '0 0 20px rgba(139, 92, 246, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink mb-2"
              >
                ShadowHome
              </motion.div>
              <motion.div
                animate={{ 
                  textShadow: [
                    '0 0 15px rgba(0, 212, 255, 0.3)',
                    '0 0 25px rgba(0, 212, 255, 0.6)',
                    '0 0 15px rgba(0, 212, 255, 0.3)'
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-2xl font-semibold text-neon-blue mb-4"
              >
                Ledger OS
              </motion.div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your home's brain — private, offline, and accountable.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-3 mb-8"
            >
              <div className="flex items-center text-sm text-gray-300">
                <Shield className="w-4 h-4 text-neon-green mr-3" />
                <span>Decentralized Authentication</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Zap className="w-4 h-4 text-neon-blue mr-3" />
                <span>Real-time Home Monitoring</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Wallet className="w-4 h-4 text-neon-purple mr-3" />
                <span>Blockchain-secured Data</span>
              </div>
            </motion.div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            {/* Connect button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConnect}
              disabled={loading || isConnecting}
              className="w-full bg-gradient-to-r from-cyber-violet to-cyber-pink hover:from-cyber-pink hover:to-cyber-violet transition-all duration-300 text-white font-semibold py-4 px-6 rounded-xl shadow-neon hover:shadow-neon-sm disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-violet to-cyber-pink opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl" />
              
              <div className="relative flex items-center justify-center">
                {(loading || isConnecting) ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                    />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-3" />
                    Connect Wallet
                  </>
                )}
              </div>
            </motion.button>

            {/* Supported wallets */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-6 text-center"
            >
              <p className="text-xs text-gray-400 mb-3">Supported Wallets</p>
              <div className="flex justify-center space-x-4">
                <div className="flex items-center space-x-2 text-xs text-gray-300">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    P
                  </div>
                  <span>Phantom</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-300">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    S
                  </div>
                  <span>Solflare</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-xs text-gray-500">
              Powered by Solana Blockchain • Secured by Zero-Knowledge Proofs
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-cyber-violet/20 to-transparent blur-3xl" />
    </div>
  );
};

export default LoginScreen;