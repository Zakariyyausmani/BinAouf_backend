import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const QuoteForm = ({ prefilledProduct, productsList }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    productInterest: '',
    orderType: '',
    quantity: '',
    targetMarket: '',
    message: '',
  });

  const [orderTypes, setOrderTypes] = useState([
    { label: 'B2B Importer', value: 'B2B Importer' },
    { label: 'Distributor', value: 'Distributor' },
    { label: 'Retail Brand', value: 'Retail Brand' },
    { label: 'Food Processor', value: 'Food Processor' },
    { label: 'Construction / Spa', value: 'Construction / Spa' },
    { label: 'Other / Custom', value: 'Other / Custom' },
  ]);

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  // Handle prefilled product from location state or props
  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({
        ...prev,
        productInterest: prefilledProduct,
      }));
    }
  }, [prefilledProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrderTypeSelect = (val) => {
    setFormData((prev) => ({
      ...prev,
      orderType: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.country || !formData.productInterest || !formData.orderType || !formData.message) {
      setStatus({ submitting: false, success: false, error: 'Please fill out all required fields.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      await API.post('/quotes', formData);
      setStatus({ submitting: false, success: true, error: null });
      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        country: '',
        productInterest: '',
        orderType: '',
        quantity: '',
        targetMarket: '',
        message: '',
      });
    } catch (error) {
      console.error('Submit quote request failed:', error);
      const msg = error.response?.data?.message || 'Failed to submit quote request. Please try again.';
      setStatus({ submitting: false, success: false, error: msg });
    }
  };

  return (
    <div className="quote-form-col">
      <h3 className="qf-title">Request a Custom Quote</h3>
      <p className="qf-sub">Provide your requirements below, and our export team will contact you within 24 hours.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="fg">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="fg">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Gourmet Foods Ltd"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="fg">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@company.com"
            />
          </div>
          <div className="fg">
            <label htmlFor="phone">WhatsApp / Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 555 123 4567"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="fg">
            <label htmlFor="country">Country *</label>
            <input
              type="text"
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              placeholder="e.g. Germany"
            />
          </div>
          <div className="fg">
            <label htmlFor="productInterest">Product Interest *</label>
            <select
              id="productInterest"
              name="productInterest"
              required
              value={formData.productInterest}
              onChange={handleChange}
            >
              <option value="">-- Select Product Range --</option>
              {productsList && productsList.length > 0 ? (
                productsList.map((p, idx) => (
                  <option key={idx} value={p.name}>
                    {p.name}
                  </option>
                ))
              ) : (
                <>
                  <option value="Edible Salt - Premium Pink Fine">Edible Salt - Premium Pink Fine</option>
                  <option value="Animal Lick Salt - Hanging Block">Animal Lick Salt - Hanging Block</option>
                  <option value="Bath Salt - Pink Bath Crystals">Bath Salt - Pink Bath Crystals</option>
                  <option value="Décor Lamps - Natural Salt Lamp">Décor Lamps - Natural Salt Lamp</option>
                  <option value="Salt Tiles / Bricks">Salt Tiles / Bricks</option>
                  <option value="Custom Cut & Bulk Export">Custom Cut & Bulk Export</option>
                </>
              )}
            </select>
          </div>
        </div>

        <div className="fg full">
          <label>Order Type *</label>
          <div className="order-types">
            {orderTypes.map((type) => (
              <div
                key={type.value}
                className={`ot-btn ${formData.orderType === type.value ? 'sel' : ''}`}
                onClick={() => handleOrderTypeSelect(type.value)}
              >
                {type.label}
              </div>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="fg">
            <label htmlFor="quantity">Approx. Quantity (Tons/Pcs)</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g. 20 Tons / 500 Pcs"
            />
          </div>
          <div className="fg">
            <label htmlFor="targetMarket">Target Market / Port</label>
            <input
              type="text"
              id="targetMarket"
              name="targetMarket"
              value={formData.targetMarket}
              onChange={handleChange}
              placeholder="e.g. Hamburg Port"
            />
          </div>
        </div>

        <div className="fg full">
          <label htmlFor="message">Detailed Requirements *</label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Please detail your custom sizing, specifications, packaging designs, or shipping timelines."
          ></textarea>
        </div>

        {status.error && (
          <div className="admin-alert" style={{ marginBottom: '15px', borderRadius: '0' }}>
            {status.error}
          </div>
        )}

        {status.success && (
          <div className="form-success" style={{ display: 'block', marginBottom: '15px' }}>
            Quote request submitted successfully. Our export sales team will reach out to you shortly.
          </div>
        )}

        <button type="submit" className="form-submit" disabled={status.submitting}>
          {status.submitting ? 'Submitting Inquiry...' : 'Submit Inquiry →'}
        </button>

        <p className="form-note">
          By submitting this form, you authorize Bin Aouf Chemicals to email or message your numbers regarding this shipment.
        </p>
      </form>
    </div>
  );
};

export default QuoteForm;
