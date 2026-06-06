import React from 'react';

const ProductPackBar = ({ categorySlug }) => {
  const getPackDetails = (slug) => {
    switch (slug) {
      case 'pp-edible':
        return {
          sizes: '250g, 500g, 1kg, 2kg, 5kg retail bags; 25kg, 50kg industrial sacks.',
          packaging: 'Stand-up pouches, shaker bottles, paper sacks, woven PP bags.',
          terms: 'FOB Karachi Port / Port Qasim. Standard payment: T/T or L/C.',
        };
      case 'pp-animal':
        return {
          sizes: '2kg, 3kg, 5kg blocks on rope; 10kg, 20kg pasture lump blocks.',
          packaging: 'Individual shrink wrap, organic jute rope, heavy corrugated cartons.',
          terms: 'Full Container Load (FCL) orders. Direct container packing.',
        };
      case 'pp-bath':
        return {
          sizes: '500g, 1kg retail jars/pouches; 25kg bulk bags/drums for spas.',
          packaging: 'Moisture-proof PET jars, stand-up zip pouches, industrial fiber drums.',
          terms: 'Air freight dispatch from Lahore, sea freight cargo from Port Qasim.',
        };
      case 'pp-decor':
        return {
          sizes: 'Natural shapes: 2-5kg, 5-10kg, 10-20kg. Crafted shapes: standard diameters.',
          packaging: 'Thick bubble wraps, individual inner cartons, reinforced outer boxes.',
          terms: 'Electrical accessories CE, UL certified. Neem wood bases standard.',
        };
      case 'pp-tiles':
        return {
          sizes: '8x4x1" and 8x8x2" standard dimensions. Custom milling upon order.',
          packaging: 'Foam sheet insulation, heavy-duty cartons, vertical pallet stacks.',
          terms: 'Moisture-controlled warehousing, shipping in sealed containers.',
        };
      case 'pp-bricks':
        return {
          sizes: '8x4x2" standard bricks, curved arch blocks for structural caves.',
          packaging: 'Wrapped pallets, corrugated spacer sheets, steel banding support.',
          terms: 'Bulk masonry quantities. Palletized loading for forklift handling.',
        };
      case 'pp-custom':
        return {
          sizes: 'Industrial grading, customized dimension cuts, ton-scale shipments.',
          packaging: '1-metric-ton jumbo bags with loops, loose bulk load container.',
          terms: 'Contract manufacturing, custom private labels, mixed consignment support.',
        };
      default:
        return {
          sizes: 'Custom client specifications, bulk packaging configurations.',
          packaging: 'Woven sacks, paper bags, jars, boxes, or pallet loads.',
          terms: 'FOB Karachi, CIF destination port, Telegraphic Transfer (T/T) / L/C.',
        };
    }
  };

  const details = getPackDetails(categorySlug);

  return (
    <div className="prod-pack-bar">
      <div className="ppb-item">
        <h5>Pack Sizes</h5>
        <p>{details.sizes}</p>
      </div>
      <div className="ppb-item">
        <h5>Packaging Options</h5>
        <p>{details.packaging}</p>
      </div>
      <div className="ppb-item">
        <h5>Export Terms & Info</h5>
        <p>{details.terms}</p>
      </div>
    </div>
  );
};

export default ProductPackBar;
