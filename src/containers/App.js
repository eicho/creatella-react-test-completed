import React, { Component } from 'react';
import ProductsGrid from '../components/ProductsGrid'
import Loader from '../components/Loader'
import InfiniteScroll from 'react-infinite-scroller';
import ProductsService from '../services/products.service';
import * as log from 'loglevel';
import './App.css';

const FETCH_SIZE = 20;
const PREFETCH_WAIT_TIME = 1000;

const debounce = (fn, time) => {
  let timeout;

  return function () {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  }
}

/**
 * App
 * Container of the app
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      sortBy: 'id',
      limit: FETCH_SIZE,
      hasMore: true,
      prefetching: false,
      fetching: false,
      error: false,
      initial: true
    }
    this.productsService = new ProductsService();
  }
  // componentWillUpdate(nextProps, nextState) {
  //   if (nextState.prefetching === false && this.state.prefetching === true) {
  //     log.debug('---prefetching=false')
  //   }
  // }
  updateProducts(products) {
    this.setState({ products: products, fetching: false });
  }
  getProducts() {
    if (this.state.fetching || this.state.error)
      return;
    this.setState({ fetching: true });
    var productsSize = this.state.products.length;
    log.debug('App.getProducts: ', this.state.sortBy, FETCH_SIZE, productsSize);
    let params = {
      sortBy: this.state.sortBy,
      limit: FETCH_SIZE,
      skip: productsSize
    }
    return this.productsService.getProducts(params)
      .then((result) => {
        let products = result.products;
        if (!products || products.length === 0) {
          this.setState({ hasMore: false });
          return;
        } else {
          this.setState({ hasMore: true });
        }
        if (this.state.sortBy !== result.params.sortBy) {
          log.debug('App.getProducts return sortBy: ', result.params.sortBy, ' mismatch current sortBy: ', this.state.sortBy);
          return;
        }
        products = this.state.products.concat(products);
        this.updateProducts(products);
        debounce(this.prefetch.bind(this), PREFETCH_WAIT_TIME)();
        return products;
      }).catch((e) => {
        log.warn('App.getProducts: ', e);
      });
  }
  prefetch() {
    if (this.state.prefetching || this.state.fetching)
      return;
    this.setState({ prefetching: true });
    var productsSize = this.state.products.length;
    log.debug('App.prefetch: ', this.state.sortBy, FETCH_SIZE, productsSize);
    let params = {
      sortBy: this.state.sortBy,
      limit: FETCH_SIZE,
      skip: productsSize
    }
    return this.productsService.getProducts(params)
      .then((products) => {
        this.setState({ prefetching: false });
        return products;
      }).catch((e) => {
        log.warn('App.prefetch: ', e);
        this.setState({ prefetching: false });
      });
  }

  onSortChange(sortBy) {
    if (sortBy === this.state.sortBy)
      return;
    log.debug('App.onSortChange: ', sortBy);
    this.setState({ sortBy: sortBy, products: [], fetching: false, hasMore: true });
    return sortBy;
  }
  onButtonClick(e) {
    this.onSortChange(e.target.innerText.toLowerCase());
  }
  handleReconnectClick() {
    this.setState({ error: false });
  }
  isSortByActive(sortBy) {
    return sortBy === this.state.sortBy ? 'btn btn-link active' : 'btn btn-link';
  }
  render() {
    return (
      <div className="App">
        <div className="App-header navbar navbar-fixed-top scrolling">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Products Grid</h2>
		  <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
          <p>But first, a word from our sponsors:</p>
          <div>
            <label>sort by:</label>
            <a id="app-sortby-price" className={this.isSortByActive('price')} onClick={this.onButtonClick.bind(this)}>Price</a>
            <a id="app-sortby-size" className={this.isSortByActive('size')} onClick={this.onButtonClick.bind(this)}>Size</a>
            <a id="app-sortby-id" className={this.isSortByActive('id')} onClick={this.onButtonClick.bind(this)}>Id</a>
          </div>
        </div>
        <br></br>
		<br></br>
        <div className="Products-container">
          {/* <ProductsGrid products={this.state.products}>
          </ProductsGrid> */}
          <InfiniteScroll
            pageStart={0}
            loadMore={this.getProducts.bind(this)}
            hasMore={this.state.hasMore}
            loader={<Loader onClick={this.handleReconnectClick.bind(this)}
              error={this.state.error}
              hasMore={this.state.hasMore} />}
            useWindow={true}>
            <ProductsGrid products={this.state.products}>
            </ProductsGrid>
            <div id='app-end-catalogue' style={{ visibility: this.state.hasMore ? 'hidden' : 'visible' }}>~ end of catalogue ~</div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default App;
