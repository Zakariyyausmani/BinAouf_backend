import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';
import ProductPackBar from '../components/ProductPackBar';

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('pp-edible');
  
  const sectionRefs = useRef({});

  // 1. Fetch categories and products
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          API.get('/categories'),
          API.get('/products')
        ]);
        setCategories(catRes.data);
        setProducts(prodRes.data);
      } catch (err) {
        console.error('Failed to fetch product catalog from API:', err);
      }
    };
    fetchCatalog();
  }, []);

  // 2. Sync tab from URL search parameters (?tab=pp-...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
      // Wait for DOM to render, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(tabParam);
        if (element) {
          const navOffset = 130; // Navbar + TabBar height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, [location.search, categories]);

  const handleTabClick = (slug) => {
    setActiveTab(slug);
    navigate(`/products?tab=${slug}`, { replace: true });
  };

  const handleGetQuote = (productName) => {
    // Navigate to contact page and pass the selected product as prefilled state
    navigate('/contact', { state: { prefilledProduct: productName } });
  };

  // Group products by category ID
  const getProductsByCategory = (catId) => {
    return products.filter(p => {
      const pCatId = typeof p.category === 'object' ? p.category?._id : p.category;
      return pCatId === catId;
    });
  };

  // Fallback default categories if backend is not seeded/running
  const defaultCategories = [
    { _id: '1', name: 'Edible Salt', slug: 'pp-edible', icon: '🧂', description: 'Gourmet cooking pink and white salts for culinary exports.' },
    { _id: '2', name: 'Animal Lick Salt', slug: 'pp-animal', icon: '🐄', description: 'Natural mineral feed salt blocks for horses and cattle.' },
    { _id: '3', name: 'Bath and Spa Salt', slug: 'pp-bath', icon: '🛁', description: 'Detoxifying salt bath crystals and smooth massage stones.' },
    { _id: '4', name: 'Décor and Lamps', slug: 'pp-decor', icon: '🕯️', description: 'Handcrafted salt lamps emitting a warm ambient glow.' },
    { _id: '5', name: 'Salt Tiles', slug: 'pp-tiles', icon: '🟫', description: 'Polished salt blocks for grilling plates and wall construction.' },
    { _id: '6', name: 'Salt Bricks', slug: 'pp-bricks', icon: '🧱', description: 'Masonry grade salt bricks for wellness rooms and salt caves.' },
    { _id: '7', name: 'Custom and Bulk', slug: 'pp-custom', icon: '🎨', description: 'Bulk shipping and B2B private label salt configurations.' },
  ];

  const displayedCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div>
      {/* Page Header */}
      <section className="prod-hero-banner">
        <div className="tag">Bin Aouf Catalog</div>
        <h1 className="sec-title">
          Our Premium Himalayan<br />
          <em>Salt Products</em>
        </h1>
        <p>
          We export clean, hand-selected Himalayan salt blocks and processed salts globally, processed in food safety environments near mining deposits.
        </p>
      </section>

      {/* Sticky Tab Bar */}
      <div className="prod-tabs-wrap">
        <div className="prod-tabs">
          {displayedCategories.map((cat) => (
            <button
              key={cat._id}
              className={`prod-tab ${activeTab === cat.slug ? 'active' : ''}`}
              onClick={() => handleTabClick(cat.slug)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Sections */}
      <div className="catalog-sections">
        {displayedCategories.map((cat) => {
          const categoryProducts = getProductsByCategory(cat._id);
          
          return (
            <section
              key={cat._id}
              id={cat.slug}
              className="prod-section"
            >
              <div className="prod-section-header">
                <div className="psh-left">
                  <div className="tag">{cat.icon} Category Range</div>
                  <h2 className="sec-title">{cat.name}</h2>
                  <p>{cat.description || 'Natural mineral products, selected and refined for optimal purity.'}</p>
                </div>
                <div className="psh-right">
                  <h5>Logistics Specifications</h5>
                  <div className="psh-specs">
                    <div className="psh-spec">
                      <span className="psh-spec-label">Purity:</span>
                      <span className="psh-spec-val">98% - 99% NaCl</span>
                    </div>
                    <div className="psh-spec">
                      <span className="psh-spec-label">Source location:</span>
                      <span className="psh-spec-val">Warcha / Khewra Mines</span>
                    </div>
                    <div className="psh-spec">
                      <span className="psh-spec-label">Certifications:</span>
                      <span className="psh-spec-val">ISO 22000, Halal, FDA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="prod-items-grid">
                {categoryProducts.length > 0 ? (
                  categoryProducts.map((prod) => (
                    <ProductCard
                      key={prod._id}
                      product={prod}
                    />
                  ))
                ) : (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
                    No products loaded in this category yet. Run database seeder or add products in admin panel.
                  </div>
                )}
              </div>

              {/* Package Details Bar */}
              <div style={{ marginTop: '50px' }}>
                <ProductPackBar categorySlug={cat.slug} />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
