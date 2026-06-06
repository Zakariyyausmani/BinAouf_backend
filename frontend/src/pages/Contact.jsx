import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../utils/api';
import FAQAccordion from '../components/FAQAccordion';
import QuoteForm from '../components/QuoteForm';

const Contact = ({ settings }) => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const prefilledProduct = location.state?.prefilledProduct || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products for dropdown:', err);
      }
    };
    fetchProducts();
  }, []);

  const primaryWhatsApp = settings?.whatsapp_primary || '+923110282668';
  const cleanWA = primaryWhatsApp.replace(/\s+/g, '').replace('+', '');
  
  const whatsappNumbers = settings?.whatsapp_numbers || [
    '+92 311 028 2668',
    '+92 300 974 5420',
    '+92 325 151 2035',
  ];
  
  const contactEmail = settings?.contact_email || 'binaoufchemicals.pk@gmail.com';
  const facilityAddress = settings?.address_facility || 'Khushab, Punjab, Pakistan (Near Warcha Salt Mine)';
  const workingHours = settings?.working_hours || {
    mon_thu: '9:00 AM to 6:00 PM',
    fri: '9:00 AM to 12:30 PM',
    sat: '10:00 AM to 4:00 PM',
    sun: 'Closed (WhatsApp Active)',
  };

  const socialLinks = {
    linkedin: settings?.social_links?.linkedin || '',
    facebook: settings?.social_links?.facebook || '',
    instagram: settings?.social_links?.instagram || 'https://www.instagram.com/binaouf.chemicals?igsh=eGlkZWtoMjBtYmg4',
    youtube: settings?.social_links?.youtube || '',
  };

  return (
    <div>
      {/* Contact Banner */}
      <section className="contact-banner">
        <div className="tag">Contact Bin Aouf</div>
        <h1 className="sec-title">
          Establish Worldwide<br />
          <em>Salt Partnerships</em>
        </h1>
        <p>
          Connect with our export sales desk. Request a catalog, request product samples, or schedule a visit to our facility in Punjab, Pakistan.
        </p>
      </section>

      {/* Top Contact Cards */}
      <section className="cm-cards">
        <div className="cm-grid">
          {/* Card 1 */}
          <div className="cmc">
            <span className="cmc-icon">💬</span>
            <h4 className="cmc-title">WhatsApp Chat</h4>
            <p className="cmc-val">{primaryWhatsApp}</p>
            <p className="cmc-desc">Immediate assistance, price lists, and order tracking logs.</p>
            <a href={`https://wa.me/${cleanWA}`} className="cmc-btn" target="_blank" rel="noopener noreferrer">
              Chat Now
            </a>
          </div>

          {/* Card 2 */}
          <div className="cmc">
            <span className="cmc-icon">📞</span>
            <h4 className="cmc-title">Call Us</h4>
            <p className="cmc-val">{whatsappNumbers[0]}</p>
            <p className="cmc-desc">Export sales line. Talk with an expert on shipping timelines.</p>
            <a href={`tel:${whatsappNumbers[0].replace(/\s+/g, '')}`} className="cmc-btn">
              Call Direct
            </a>
          </div>

          {/* Card 3 */}
          <div className="cmc">
            <span className="cmc-icon">✉️</span>
            <h4 className="cmc-title">Email Desk</h4>
            <p className="cmc-val">{contactEmail}</p>
            <p className="cmc-desc">For formal RFQs, purchase orders, and legal documentation.</p>
            <a href={`mailto:${contactEmail}`} className="cmc-btn">
              Email Us
            </a>
          </div>

          {/* Card 4 */}
          <div className="cmc">
            <span className="cmc-icon">📸</span>
            <h4 className="cmc-title">Instagram DM</h4>
            <p className="cmc-val">@binaouf.chemicals</p>
            <p className="cmc-desc">Follow us, message our team, and explore visual product logs.</p>
            <a href={socialLinks.instagram} className="cmc-btn" target="_blank" rel="noopener noreferrer">
              DM Us
            </a>
          </div>

          {/* Card 5 */}
          <div className="cmc">
            <span className="cmc-icon">📍</span>
            <h4 className="cmc-title">Our Facility</h4>
            <p className="cmc-val">Khushab, Punjab</p>
            <p className="cmc-desc">Near Warcha mining range. Visitors by appointment only.</p>
            <a href="#facility-details" className="cmc-btn">
              View Address
            </a>
          </div>
        </div>
      </section>

      {/* Main Form & Info Split */}
      <section className="contact-main" id="facility-details">
        <div className="contact-info-col">
          <div className="ci-tag">Bin Aouf Headquarters</div>
          <h2 className="ci-title">
            Let's Discuss Your<br />
            <em>Consignment Specifications</em>
          </h2>
          <p className="ci-p">
            We support mixed container orders, private labeling, and custom grade combinations. Reach out using any channel or fill in our detailed quote form.
          </p>

          <div className="info-blocks">
            {/* Block 1 */}
            <div className="ib">
              <span className="ib-icon">💬</span>
              <div>
                <div className="ib-label">WhatsApp Lines</div>
                <div className="ib-val">{whatsappNumbers[0]}</div>
                <div className="ib-sub">{whatsappNumbers.slice(1).join(' · ')}</div>
              </div>
            </div>

            {/* Block 2 */}
            <div className="ib">
              <span className="ib-icon">✉️</span>
              <div>
                <div className="ib-label">Official Email</div>
                <div className="ib-val">{contactEmail}</div>
                <div className="ib-sub">For B2B inquiries and trade quotes</div>
              </div>
            </div>

            {/* Block 3 */}
            <div className="ib">
              <span className="ib-icon">📍</span>
              <div>
                <div className="ib-label">Export Facility</div>
                <div className="ib-val">{facilityAddress}</div>
                <div className="ib-sub">Air freight: Lahore airport | Sea Port: Port Qasim, Karachi</div>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="wh-box">
            <div className="wh-title">Working Hours (PKT)</div>
            <div className="wh-row">
              <span className="wh-day">Monday to Thursday</span>
              <span className="wh-time">
                {workingHours.mon_thu} <span className="wh-badge">Open</span>
              </span>
            </div>
            <div className="wh-row">
              <span className="wh-day">Friday</span>
              <span className="wh-time">{workingHours.fri}</span>
            </div>
            <div className="wh-row">
              <span className="wh-day">Saturday</span>
              <span className="wh-time">{workingHours.sat}</span>
            </div>
            <div className="wh-row">
              <span className="wh-day">Sunday</span>
              <span className="wh-time">{workingHours.sun}</span>
            </div>
          </div>

          {/* Social Row */}
          <div className="soc-row">
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} className="soc-btn" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} className="soc-btn" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} className="soc-btn" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
            {socialLinks.youtube && (
              <a href={socialLinks.youtube} className="soc-btn" target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            )}
          </div>
        </div>

        {/* Quote Form Component */}
        <QuoteForm prefilledProduct={prefilledProduct} productsList={products} />
      </section>

      {/* FAQ Accordion Section */}
      <section className="faq-sec">
        <div className="tag center">FAQ Desk</div>
        <h2 className="sec-title" style={{ textAlign: 'center', marginBottom: '10px' }}>
          Frequently Asked Questions
        </h2>
        <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--muted)', maxWidth: '500px', margin: '0 auto 30px', fontWeight: 300 }}>
          Got questions about minimum orders, custom labeling, or packaging? Find key answers here.
        </p>

        <FAQAccordion />
      </section>
    </div>
  );
};

export default Contact;
