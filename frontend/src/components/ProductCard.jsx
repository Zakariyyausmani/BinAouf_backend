import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  const getCategoryStyles = (categorySlug) => {
    switch (categorySlug) {
      case 'pp-edible':
        return { gradient: 'linear-gradient(135deg, #e89a7a 0%, #7a3020 100%)', icon: '🧂' };
      case 'pp-animal':
        return { gradient: 'linear-gradient(135deg, #c47058 0%, #5c2318 100%)', icon: '🐄' };
      case 'pp-bath':
        return { gradient: 'linear-gradient(135deg, #e8b090 0%, #7a3828 100%)', icon: '🛁' };
      case 'pp-decor':
        return { gradient: 'linear-gradient(135deg, #d4876b 0%, #5c2318 100%)', icon: '🕯️' };
      case 'pp-tiles':
        return { gradient: 'linear-gradient(135deg, #b05940 0%, #5c2318 100%)', icon: '🟫' };
      case 'pp-bricks':
        return { gradient: 'linear-gradient(135deg, #8a3a28 0%, #5c2318 100%)', icon: '🧱' };
      case 'pp-custom':
        return { gradient: 'linear-gradient(135deg, #c9a96e 0%, #5c2318 100%)', icon: '🎨' };
      default:
        return { gradient: 'linear-gradient(135deg, #d4876b 0%, #5c2318 100%)', icon: '🧂' };
    }
  };

  const categorySlug = product.category?.slug || '';
  const categoryName = product.category?.name || '';
  const styles = getCategoryStyles(categorySlug);

  return (
    <div className="prod-item reveal visible" onClick={() => navigate(`/product/${product._id}`)}>
      <div 
        className="prod-item-img" 
        style={{ 
          background: product.imageUrl ? `url(${product.imageUrl})` : styles.gradient,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white'
        }}
      >
        {!product.imageUrl && <span>{styles.icon}</span>}
      </div>
      
      <div className="prod-item-body">
        <span className="prod-item-cat">{categoryName}</span>
        <h3 className="prod-item-name">{product.name}</h3>
        <p className="prod-item-desc">{product.description}</p>
        
        {product.tags && product.tags.length > 0 && (
          <div className="prod-item-tags">
            {product.tags.map((tag, idx) => (
              <span key={idx} className="p-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="prod-item-cta">
          <button onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product._id}`);
          }}>
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
