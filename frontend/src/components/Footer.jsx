import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ settings }) => {
  const contactEmail = settings?.contact_email || 'binaoufchemicals.pk@gmail.com';
  const whatsappPrimary = settings?.whatsapp_primary || '+923110282668';
  const whatsappNumbers = settings?.whatsapp_numbers || [
    '+92 311 028 2668',
    '+92 300 974 5420',
    '+92 325 151 2035',
  ];
  const socialLinks = {
    linkedin: settings?.social_links?.linkedin || '',
    facebook: settings?.social_links?.facebook || '',
    instagram: settings?.social_links?.instagram || 'https://www.instagram.com/binaouf.chemicals?igsh=eGlkZWtoMjBtYmg4',
    youtube: settings?.social_links?.youtube || '',
  };

  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="fl">
            Bin <span>Aouf</span>
          </Link>
          <p>
            Bin Aouf brings you the finest Himalayan pink salt, ethically sourced and manufactured under strict safety guidelines. Delivering health and wellness worldwide.
          </p>
        </div>

        <div className="footer-col">
          <h5>Products</h5>
          <ul>
            <li>
              <Link to="/products?tab=pp-edible">Edible Salt</Link>
            </li>
            <li>
              <Link to="/products?tab=pp-animal">Animal Lick Salt</Link>
            </li>
            <li>
              <Link to="/products?tab=pp-bath">Bath and Spa Salt</Link>
            </li>
            <li>
              <Link to="/products?tab=pp-decor">Décor and Lamps</Link>
            </li>
            <li>
              <Link to="/products?tab=pp-tiles">Salt Tiles & Bricks</Link>
            </li>
            <li>
              <Link to="/products?tab=pp-custom">Custom & Bulk</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/process">Production Process</Link>
            </li>
            <li>
              <Link to="/contact">Contact Info</Link>
            </li>
            <li>
              <Link to="/admin">Admin Panel</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            <li>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </li>
            {whatsappNumbers.map((phone, idx) => (
              <li key={idx}>
                <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
              </li>
            ))}
            <li style={{ marginTop: '10px' }}>
              <Link to="/contact" className="nav-quote-btn" style={{ display: 'inline-block', color: 'white' }}>
                Request Quote
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bin Aouf Chemicals. All Rights Reserved. Crafted for premium Himalayan export.</p>
        <div className="footer-socials">
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="fsoc" title="LinkedIn">
              LI
            </a>
          )}
          {socialLinks.facebook && (
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="fsoc" title="Facebook">
              FB
            </a>
          )}
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="fsoc" title="Instagram">
              IG
            </a>
          )}
          {socialLinks.youtube && (
            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="fsoc" title="YouTube">
              YT
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
