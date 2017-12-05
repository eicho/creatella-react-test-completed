import React, { Component } from 'react';
import Advertisement from './Advertisement';
import Product from './Product';

// TODO: the ads API can only return 16 different results
//       from 0-15, so random in range (0-15). Need to update
//       if the API changes.
const ADS_ID_RANGE = 16;

class ProductsGrid extends Component {
  constructor(props) {
    super(props);
    this.adsIds = [];
  }
  getRandomAdsId() {
    var newAdId = Math.floor(Math.random(new Date().getTime()) * ADS_ID_RANGE);
    while (this.adsIds.length > 0 && newAdId === this.adsIds[this.adsIds.length - 1]) {
      newAdId = Math.floor(Math.random(new Date().getTime()) * ADS_ID_RANGE);
    }
    return newAdId;
  }
  render() {
    var cards = [];
    var adsCount = 0;
    this.props.products.forEach((product, index) => {
      // Insert product
      cards.push(<Product product={product} key={product.id} />);
      // After every 20th row, insert an Advertisement
      if (((index + 1) % 20) === 0) {
        var adsId = this.adsIds[adsCount++];
        if (adsId === undefined) {
          adsId = this.getRandomAdsId();
          this.adsIds.push(adsId);
        }
        cards.push(<Advertisement key={index} id={adsId} />);
      }
    });
    return (
      <div className="products-grid">
        {cards}
      </div>
    );
  }
}

export default ProductsGrid;