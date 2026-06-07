import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const navOffset = 160; // Navbar + TabBar height (increased to avoid cut-off)

const Navbar = () => {
  const [isSolid, setIsSolid] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsSolid(true);
      } else {
        setIsSolid(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileOpen ? 'open' : ''}`}>
        <button className="mob-close" onClick={() => setIsMobileOpen(false)}>✕</button>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
        <Link to="/process">Process</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Main Navigation */}
      <nav id="mainNav" className={`${isSolid ? 'solid' : 'transparent'} ${location.pathname === '/' ? 'home-nav' : 'inner-nav'}`}>
        <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0px', textDecoration: 'none' }}>
          <img src="/logo.png" alt="Bin Aouf Logo" style={{ height: '55px', width: 'auto' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '-15px' }}>
            <span className="logo-text-main">Bin Aouf</span>
            <span className="logo-text-sub">Chemicals</span>
          </div>
        </Link>
        
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active-nav' : ''}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'active-nav' : ''}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'active-nav' : ''}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/process" className={({ isActive }) => isActive ? 'active-nav' : ''}>
              Process
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active-nav' : ''}>
              Contact
            </NavLink>
          </li>
          <li>
            <Link to="/contact" className="nav-quote-btn">
              Request Quote
            </Link>
          </li>
        </ul>

        <div className="burger" onClick={() => setIsMobileOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
