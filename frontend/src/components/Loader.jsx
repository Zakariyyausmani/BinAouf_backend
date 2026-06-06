import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div id="loader">
      <div className="loader-logo">Bin Aouf</div>
      <div className="loader-sub">Premium Himalayan Salt</div>
      <div className="loader-bar">
        <div className="loader-fill"></div>
      </div>
    </div>
  );
};

export default Loader;
