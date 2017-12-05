import React, { Component } from 'react';

class Advertisement extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div className="thumbnail card no-border">
          <img className="ads" src={'/ad/?r=' + this.props.id} alt={'/ad/?r=' + this.props.id} />
        </div>
      </div>
    );
  }
}

export default Advertisement;