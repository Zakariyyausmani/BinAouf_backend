import React from 'react';

const TestimonialCard = ({ rating, quote, avatarLetter, name, location, companyType }) => {
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

  return (
    <div className="testi-card reveal visible">
      <div className="stars">{stars}</div>
      <div className="testi-text">"{quote}"</div>
      <div className="testi-author">
        <div className="testi-avatar">{avatarLetter || name.charAt(0)}</div>
        <div>
          <div className="testi-name">{name}</div>
          <div className="testi-loc">{companyType ? `${companyType} · ` : ''}{location}</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
