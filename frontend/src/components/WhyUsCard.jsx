import React from 'react';

const WhyUsCard = ({ icon, title, desc }) => {
  return (
    <div className="why-card reveal visible">
      <div className="why-icon">{icon}</div>
      <div className="why-title">{title}</div>
      <div className="why-desc">{desc}</div>
    </div>
  );
};

export default WhyUsCard;
