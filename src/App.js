import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider, useWallet } from './contexts/WalletContext.tsx';
import LoginScreen from './components/LoginScreen.js';
import DashboardLayout from './components/DashboardLayout.tsx';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isConnected, isAuthenticated } = useWallet();
  
  if (!isConnected || !isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route 
              path="/dashboard/*" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;