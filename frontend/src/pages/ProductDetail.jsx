import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';

const ProductDetail = ({ settings }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pd-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: 'var(--muted)' }}>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd-container" style={{ textAlign: 'center' }}>
        <h2 className="sec-title">Product Not Found</h2>
        <button className="btn-outline" style={{ marginTop: '20px' }} onClick={() => navigate('/products')}>
          Back to Catalog
        </button>
      </div>
    );
  }

  const categoryName = product.category?.name || 'Catalog';
  const categoryIcon = product.category?.icon || '🧂';
  const whatsappNumber = settings?.whatsapp_primary || '';
  const instagramUrl = settings?.social_links?.instagram || 'https://www.instagram.com/binaouf.chemicals?igsh=eGlkZWtoMjBtYmg4';
  
  // Format WhatsApp message
  const waMessage = encodeURIComponent(`Hello, I am interested in ordering: ${product.name}`);
  const waLink = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${waMessage}` : '#';

  return (
    <div className="pd-container">
      <div className="pd-split">
        {/* Left Side: Image */}
        <div className="pd-left">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="pd-image" />
          ) : (
            <div className="pd-icon-placeholder">{categoryIcon}</div>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="pd-right">
          <div className="pd-category">
            {categoryIcon} {categoryName}
          </div>
          <h1 className="pd-title">{product.name}</h1>
          <p className="pd-desc">{product.description}</p>
          
          {product.tags && product.tags.length > 0 && (
            <div className="pd-tags">
              {product.tags.map((tag, idx) => (
                <span key={idx}>{tag}</span>
              ))}
            </div>
          )}

          <div className="pd-actions">
            <button 
              className="btn-primary" 
              onClick={() => navigate('/contact', { state: { prefilledProduct: product.name } })}
            >
              Get a Quote 📝
            </button>
            {whatsappNumber && (
              <a 
                href={waLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp"
              >
                Order via WhatsApp
              </a>
            )}
            <a 
              href={instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-instagram"
            >
              Contact on Instagram
            </a>
            <button 
              className="btn-outline" 
              onClick={() => navigate('/products')}
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
