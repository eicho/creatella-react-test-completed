import React, { Component } from 'react';

class Loader extends Component {
  render() {
    let loader;
    if (this.props.error)
      loader = <div className="loader">Network connection failed ... Please <a className="btn-link" onClick={this.props.onClick}>retry</a></div>
    else
      loader = <div className="loader">Loading ...</div>;

    return (
      loader
    );
  }
}

export default Loader;