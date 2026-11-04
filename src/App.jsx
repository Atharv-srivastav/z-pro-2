import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Portfolio from './pages/Portfolio';
import ContactManager from './pages/ContactManager';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  // Active view state: 'portfolio' | 'contact-manager' | 'admin'
  const [activeView, setActiveView] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#contact-manager' || hash === '#contact-manager-preview') return 'contact-manager';
    if (hash === '#admin' || hash === '#admin-preview') return 'admin';
    return 'portfolio';
  });

  // Keep hash in sync with view
  useEffect(() => {
    if (activeView === 'contact-manager') {
      window.location.hash = '#contact-manager';
    } else if (activeView === 'admin') {
      window.location.hash = '#admin';
    } else {
      if (window.location.hash.startsWith('#contact-manager') || window.location.hash.startsWith('#admin')) {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
  }, [activeView]);

  return (
    <div className="app-layout">
      {/* Universal Fixed Navigation Bar */}
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {/* Dynamic View Container */}
      {activeView === 'portfolio' && (
        <Portfolio setActiveView={setActiveView} />
      )}

      {activeView === 'contact-manager' && (
        <ContactManager setActiveView={setActiveView} />
      )}

      {activeView === 'admin' && (
        <AdminDashboard setActiveView={setActiveView} />
      )}

      {/* Universal Semantic Footer */}
      <Footer setActiveView={setActiveView} />
    </div>
  );
}
