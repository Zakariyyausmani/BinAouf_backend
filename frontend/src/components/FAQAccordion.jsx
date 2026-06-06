import React, { useState } from 'react';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is the minimum order quantity (MOQ) for export?',
      a: 'Our general MOQ for bulk sea freight shipments is one 20ft Full Container Load (FCL), which accommodates approximately 19-20 metric tons. For trial shipments, custom products, or high-value wellness salts, we can discuss smaller initial quantities.',
    },
    {
      q: 'Can we request private label packaging?',
      a: 'Absolutely. We offer complete private label (OEM) solutions. We can package edible, bath, or spa salts in your custom-branded stand-up pouches, shaker bottles, rigid jars, or custom-designed boxes matching your specifications.',
    },
    {
      q: 'Which shipping ports and airports do you use?',
      a: 'All sea shipments are loaded and exported from Port Qasim or Karachi Port. Air freight consignments are dispatched from Allama Iqbal International Airport in Lahore.',
    },
    {
      q: 'How do you ensure the purity and quality of your salt?',
      a: 'Our facility operates near the Warcha Salt Mine under strict sanitary standards. We test every batch for chemical composition (ensuring 98%+ NaCl purity), moisture, and trace mineral balance. We are fully compliant with ISO 22000, Halal, and FDA guidelines.',
    },
    {
      q: 'What packaging sizes do you offer for edible and bulk salt?',
      a: 'For consumer retail, we offer bags from 250g to 5kg. For bulk, B2B, and food processing, we provide standard 25kg woven polypropylene bags, heavy paper bags, and 1-metric-ton jumbo supersacks.',
    },
    {
      q: 'Are your animal lick blocks completely natural?',
      a: 'Yes. Our natural rock lick blocks are 100% pure Himalayan salt containing 84 natural trace minerals (iron, magnesium, potassium, etc.) with absolutely no chemical binders, additives, or artificial flavorings.',
    },
    {
      q: 'What are your standard payment terms for international trade?',
      a: 'Our usual terms are 30% advance deposit via Telegraphic Transfer (T/T) and the remaining 70% paid against scan of the original Bill of Lading, or 100% irrevocable Letter of Credit (L/C) at sight.',
      // typo fix in text
    },
    {
      q: 'How long does it take to prepare and ship an order?',
      a: 'Standard container orders are typically processed, packed, and delivered to Karachi port within 14 to 21 days from receipt of deposit. Custom packaging or custom-milled sizes may require a slightly longer preparation window.',
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-grid">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? 'open' : ''}`}
        >
          <div className="faq-q" onClick={() => handleToggle(index)}>
            <span className="faq-q-text">{faq.q}</span>
            <span className="faq-chevron">▾</span>
          </div>
          <div className="faq-a">
            <p>{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
