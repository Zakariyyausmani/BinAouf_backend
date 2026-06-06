import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import Products from './pages/Products';
import AboutUs from './pages/AboutUs';
import Process from './pages/Process';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetail from './pages/ProductDetail';
import API from './utils/api';
import './App.css';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout with Navbar, Footer, WhatsApp float
const PublicLayout = ({ children, settings }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer settings={settings} />
    <WhatsAppFloat number={settings?.whatsapp_primary} />
  </>
);

function App() {
  const [settings, setSettings] = useState(null);

  // Fetch global site settings on mount (used in Footer & Contact page)
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get('/settings');
        setSettings(res.data);
      } catch (err) {
        // Silently fail – default values will be used in components
        console.warn('Could not fetch site settings from API. Using defaults.');
      }
    };
    fetchSettings();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Loader />
        <Routes>
          {/* Public pages */}
          <Route
            path="/"
            element={
              <PublicLayout settings={settings}>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/products"
            element={
              <PublicLayout settings={settings}>
                <Products />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout settings={settings}>
                <AboutUs />
              </PublicLayout>
            }
          />
          <Route
            path="/process"
            element={
              <PublicLayout settings={settings}>
                <Process />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout settings={settings}>
                <Contact settings={settings} />
              </PublicLayout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PublicLayout settings={settings}>
                <ProductDetail settings={settings} />
              </PublicLayout>
            }
          />

          {/* Admin pages – no public Navbar/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
