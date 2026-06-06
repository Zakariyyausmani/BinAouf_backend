import React from 'react';

const CategoryCard = ({ icon, name, desc, bgGradient, onClick }) => {
  return (
    <div className="cat-card reveal visible" onClick={onClick}>
      <div 
        className="cat-img-bg" 
        style={{ background: bgGradient }}
      ></div>
      <div className="cat-overlay"></div>
      <div className="cat-body">
        <span className="cat-icon">{icon}</span>
        <div className="cat-name">{name}</div>
        <div className="cat-desc">{desc}</div>
        <span className="cat-cta">View Products →</span>
      </div>
    </div>
  );
};

export default CategoryCard;
