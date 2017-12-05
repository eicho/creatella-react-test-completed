import { get } from './restAPI';
import * as log from 'loglevel';
var LRU = require("lru-cache")
  , options = {
    max: 1000
    , length: function (n, key) { return n.length; }
    , maxAge: 1000 * 60 * 10
  }
  , cache = LRU(options); // client cache could speed up a lot for revisited pages
class ProductsService {
  constructor(option) {
    this.processing = false;
    this.option = {};
    this.hitcache = 0;
    this.pendingGetPromise = null;
  }
  getCacheKey(params) {
    return params.sortBy + '-' + params.limit + '-' + params.skip;
  }
  getProductsFromCache(key) {
    return cache.get(key);
  }
  getProductsFromServer(params, key) {
    return get('/api/products', {
      sort: params.sortBy,
      limit: params.limit,
      skip: params.skip
    }).then((response) => {
      var data = response.data;
      var products = data.split('\n')
        .filter((line) => {
          return line;
        })
        .map((line) => {
          return JSON.parse(line);
        });
      cache.set(key, products);
      this.processing = false;
      var result = {
        params: params,
        products: products
      }
      return result;
    }).catch((e) => {
      this.processing = false;
      throw e;
    });
  }
  getProducts(params) {
    var key = this.getCacheKey(params);
    if (this.getProductsFromCache(key)) {
      this.hitcache++;
      log.debug('Producets.Service.getProducts hit cache: ', key);
      var result = {
        params: params,
        products: this.getProductsFromCache(key)
      }
      return Promise.resolve(result);
    }
    log.debug('Producets.Service.getProducts miss cache: ', key);
    // if(this.processing)
    //     return Promise.reject(
    //         {message: 'Producets.Service.getProducts Pending', 
    //          pendingGetPromise: this.pendingGetPromise});
    this.processing = true;
    let products = this.getProductsFromServer(params, key);
    this.pendingGetPromise = Promise.resolve(products);
    return this.pendingGetPromise;
  }
}


export default ProductsService;