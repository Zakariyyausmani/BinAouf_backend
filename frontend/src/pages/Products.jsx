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
    }
  }, [location.search, categories]);

  const handleTabClick = (slug) => {
    setActiveTab(slug);
    navigate(`/products?tab=${slug}`, { replace: true });
    // Scroll to top of catalog section smoothly
    window.scrollTo({ top: 400, behavior: 'smooth' });
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
  
  // Find the currently active category
  const currentCategory = displayedCategories.find(cat => cat.slug === activeTab) || displayedCategories[0];
  const categoryProducts = currentCategory ? getProductsByCategory(currentCategory._id) : [];

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

      {/* Categories Sections (Only active category shown) */}
      <div className="catalog-sections" style={{ minHeight: '60vh' }}>
        {currentCategory && (
          <section
            id={currentCategory.slug}
            className="prod-section"
            style={{ animation: 'fadeIn 0.5s ease-in-out' }}
          >
            <div className="prod-section-header" style={{ display: 'block', textAlign: 'center' }}>
              <div className="tag" style={{ margin: '0 auto 10px' }}>{currentCategory.icon} Category Range</div>
              <h2 className="sec-title">{currentCategory.name}</h2>
              <p style={{ maxWidth: '800px', margin: '0 auto' }}>{currentCategory.description || 'Natural mineral products, selected and refined for optimal purity.'}</p>
            </div>

            {/* Dynamic Specifications Table */}
            {currentCategory.specifications && currentCategory.specifications.length > 0 && (
              <div className="prod-spec-table-container" style={{ margin: '40px auto', maxWidth: '1000px', overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ background: '#666', color: 'white' }}>
                      <th style={{ padding: '16px', fontWeight: 600, borderBottom: '2px solid #555' }}>Sr #</th>
                      <th style={{ padding: '16px', fontWeight: 600, borderBottom: '2px solid #555' }}>Name</th>
                      <th style={{ padding: '16px', fontWeight: 600, borderBottom: '2px solid #555' }}>Weight (kg)</th>
                      <th style={{ padding: '16px', fontWeight: 600, borderBottom: '2px solid #555' }}>Size (cm)</th>
                      <th style={{ padding: '16px', fontWeight: 600, borderBottom: '2px solid #555' }}>Packing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCategory.specifications.map((spec, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee', background: idx % 2 === 0 ? '#fff' : '#fcfcfc' }}>
                        <td style={{ padding: '16px', color: '#555' }}>{String(idx + 1).padStart(2, '0')}</td>
                        <td style={{ padding: '16px', fontWeight: 500, color: '#333' }}>{spec.name}</td>
                        <td style={{ padding: '16px', color: '#555' }}>{spec.weight}</td>
                        <td style={{ padding: '16px', color: '#555' }}>{spec.size}</td>
                        <td style={{ padding: '16px', color: '#555' }}>{spec.packing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

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
              <ProductPackBar categorySlug={currentCategory.slug} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Products;
