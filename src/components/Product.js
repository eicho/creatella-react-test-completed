import React, { Component } from 'react';
import accounting from 'accounting';
import './Product.css'
class Product extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <div className="thumbnail card">
          <div className="face" style={{ fontSize: this.props.product.size + 'px' }}>{this.props.product.face}</div>
          <div className="caption text-center">
            <div><label>Id</label><span className="productId">{this.props.product.id}</span></div>
            <div><label>Price</label><span className="currency">{accounting.formatMoney(this.props.product.price)}</span></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;