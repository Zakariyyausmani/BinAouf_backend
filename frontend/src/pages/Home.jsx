import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import CategoryCard from '../components/CategoryCard';
import WhyUsCard from '../components/WhyUsCard';
import TestimonialCard from '../components/TestimonialCard';

const Home = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await API.get('/testimonials');
        setTestimonials(res.data);
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
      }
    };
    fetchTestimonials();
  }, []);

  const handleCategoryClick = (tabId) => {
    navigate(`/products?tab=${tabId}`);
  };

  const categories = [
    { name: 'Edible Salt', slug: 'pp-edible', icon: '🧂', desc: 'Fine grain, coarse, iodized and gourmet cooking salt for retail and food industry.', bg: 'linear-gradient(155deg, #e89a7a, #7a3020)' },
    { name: 'Animal Lick Salt', slug: 'pp-animal', icon: '🐄', desc: 'Natural mineral blocks for cattle, horses, sheep and goats.', bg: 'linear-gradient(155deg, #c47058, #5c2318)' },
    { name: 'Bath and Spa Salt', slug: 'pp-bath', icon: '🛁', desc: 'Therapeutic bath salts, body scrubs, foot soaks and spa massage stones.', bg: 'linear-gradient(155deg, #e8b090, #7a3828)' },
    { name: 'Décor and Lamps', slug: 'pp-decor', icon: '🕯️', desc: 'Hand-carved salt lamps, USB mini lamps, fire bowls and custom décor.', bg: 'linear-gradient(155deg, #d4876b, #5c2318)' },
    { name: 'Custom and Bulk', slug: 'pp-custom', icon: '🎨', desc: 'Private label contracts, bulk containers, and custom milled shapes.', bg: 'linear-gradient(155deg, #c9a96e, #5c2318)' },
  ];

  // Default fallback testimonials if API returns empty
  const defaultTestimonials = [
    {
      name: 'Arthur Pendelton',
      location: 'Munich, Germany',
      companyType: 'Gourmet Foods Importer',
      rating: 5,
      quote: 'Working with Bin Aouf has transformed our sourcing. Their edible pink salt is of exceptional purity, and the packaging options (especially the customized 25kg sacks) were handled with complete professionalism. Port Qasim export logistics were flawless.',
      avatarLetter: 'A'
    },
    {
      name: 'Elena Rostova',
      location: 'Saint Petersburg, Russia',
      companyType: 'Luxury Spa Builder',
      rating: 5,
      quote: 'The precision-cut salt tiles and bricks we received for our wellness center project are beautiful. Standard sizes were exact to the millimeter, and the backlighting effect on the rustic bricks has given our salt therapy rooms a true wow factor.',
      avatarLetter: 'E'
    },
    {
      name: 'Hassan Al-Mansoori',
      location: 'Dubai, UAE',
      companyType: 'Agricultural Supply Group',
      rating: 5,
      quote: 'Bin Aouf is our reliable supplier of animal lick blocks on rope. Cattle farmers in our network prefer their raw natural rocks because of the durability and rich mineral content. Their customer support via WhatsApp is incredibly fast.',
      avatarLetter: 'H'
    }
  ];

  const activeTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag">Straight from Khewra, Warcha and Kalabagh</div>
          <h1 className="hero-h1">
            Nature's Purest<br />
            <em>Salt</em> Delivered<br />
            to the World
          </h1>
          <p className="hero-sub">Crafted by Nature. Delivered by Bin Aouf.</p>
          <p className="hero-p">
            Bin Aouf brings you the finest Himalayan pink salt, ethically sourced from Pakistan's ancient mines. Edible, wellness, décor, and livestock salt for global buyers.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate('/products')}>
              Explore Products →
            </button>
            <button className="btn-outline" onClick={() => navigate('/contact')}>
              Request a Quote
            </button>
          </div>
          <div className="hero-stats">
            <div>
              <span className="stat-n">250M+</span>
              <span className="stat-l">Years Old Salt</span>
            </div>
            <div>
              <span className="stat-n">98%</span>
              <span className="stat-l">NaCl Purity</span>
            </div>
            <div>
              <span className="stat-n">40+</span>
              <span className="stat-l">Countries Served</span>
            </div>
          </div>
        </div>
        
        <div className="hero-right">
          <div className="hero-visual">
            <div className="hero-circles">
              <div className="hc hc1"></div>
              <div className="hc hc2"></div>
              <div className="hc hc3"></div>
            </div>
            <div className="crystal-wrap">
              <svg className="crystal-svg" viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="cg1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fdf0e8" stopOpacity=".95" />
                    <stop offset="100%" stopColor="#e8c4a0" stopOpacity=".7" />
                  </linearGradient>
                  <linearGradient id="cg2" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c47058" stopOpacity=".9" />
                    <stop offset="100%" stopColor="#8a3a28" stopOpacity=".8" />
                  </linearGradient>
                  <linearGradient id="cg3" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#e8d0b8" stopOpacity=".85" />
                    <stop offset="100%" stopColor="#d4a882" stopOpacity=".6" />
                  </linearGradient>
                </defs>
                <polygon points="150,20 260,100 260,260 150,340 40,260 40,100" fill="url(#cg1)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                <polygon points="150,20 260,100 150,160" fill="url(#cg2)" opacity=".7" />
                <polygon points="150,20 40,100 150,160" fill="url(#cg3)" opacity=".6" />
                <polygon points="40,100 260,100 150,160" fill="rgba(255,255,255,0.15)" />
                <polygon points="40,100 150,160 40,260" fill="url(#cg2)" opacity=".5" />
                <polygon points="260,100 260,260 150,160" fill="url(#cg1)" opacity=".4" />
                <polygon points="150,160 260,260 150,340 40,260" fill="url(#cg3)" opacity=".6" />
                <circle cx="90" cy="80" r="3" fill="white" opacity=".8">
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="210" cy="120" r="2" fill="white" opacity=".6">
                  <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="50" r="2.5" fill="white" opacity=".9">
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.5s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="ticker">
        <div className="ticker-track">
          <span className="ticker-item">Edible Salt</span>
          <span className="ticker-item">Animal Lick Salt</span>
          <span className="ticker-item">Bath and Spa Salt</span>
          <span className="ticker-item">Salt Décor and Lamps</span>
          <span className="ticker-item">Bulk Export</span>
          <span className="ticker-item">ISO Certified</span>
          <span className="ticker-item">Halal Certified</span>
          <span className="ticker-item">Worldwide Shipping</span>
          <span className="ticker-item">Custom Packaging</span>
          <span className="ticker-item">Private Label</span>
          
          <span className="ticker-item">Edible Salt</span>
          <span className="ticker-item">Animal Lick Salt</span>
          <span className="ticker-item">Bath and Spa Salt</span>
          <span className="ticker-item">Salt Décor and Lamps</span>
          <span className="ticker-item">Bulk Export</span>
          <span className="ticker-item">ISO Certified</span>
          <span className="ticker-item">Halal Certified</span>
          <span className="ticker-item">Worldwide Shipping</span>
          <span className="ticker-item">Custom Packaging</span>
          <span className="ticker-item">Private Label</span>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="home-cats">
        <div className="home-cats-header reveal visible">
          <div className="tag center">Product Categories</div>
          <h2 className="sec-title">
            Salt in Every<br />
            <em>Form and Purpose</em>
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '500px', margin: '16px auto 0', fontWeight: '300', lineHeight: '1.85' }}>
            Premium rock salt ranges sourced directly from Pakistan's most prominent mine resources.
          </p>
        </div>
        <div className="cats-grid">
          {categories.map((cat, idx) => (
            <CategoryCard
              key={idx}
              name={cat.name}
              icon={cat.icon}
              desc={cat.desc}
              bgGradient={cat.bg}
              onClick={() => handleCategoryClick(cat.slug)}
            />
          ))}
        </div>
      </section>

      {/* Why Us Cards */}
      <section className="home-why">
        <div className="reveal visible" style={{ textAlign: 'center' }}>
          <div className="tag center">Why Bin Aouf</div>
          <h2 className="sec-title">
            Your Trusted Himalayan<br />
            <em>Salt Partner</em>
          </h2>
        </div>
        <div className="why-grid">
          <WhyUsCard
            icon="🏭"
            title="Direct from Source"
            desc="We source directly from Khewra, Warcha, and Kalabagh mines. No middlemen, better B2B wholesale pricing, and guaranteed geological authenticity."
          />
          <WhyUsCard
            icon="🔬"
            title="Rigorous Quality Checks"
            desc="Every batch undergoes chemical grading to certify 98%+ sodium chloride purity and zero harmful additives or environmental heavy metals."
          />
          <WhyUsCard
            icon="📦"
            title="Custom Private Label"
            desc="We offer dynamic private label packaging. Custom boxes, retail stand-up pouches, and custom bags tailored to your branding guidelines."
          />
          <WhyUsCard
            icon="🚢"
            title="Global Logistics Experts"
            desc="Our cargo agents coordinate freight from Port Qasim and Karachi Port to any international port. We manage full export paperwork smoothly."
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="home-testi">
        <div className="tag center">Testimonials</div>
        <h2 className="sec-title white">
          What Our Global<br />
          <em>Buyers Say</em>
        </h2>
        
        <div className="testi-grid">
          {activeTestimonials.map((t, idx) => (
            <TestimonialCard
              key={idx}
              name={t.name}
              location={t.location}
              companyType={t.companyType}
              rating={t.rating}
              quote={t.quote}
              avatarLetter={t.avatarLetter}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
