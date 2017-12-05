import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
jest.mock('../services/restAPI');
jest.useFakeTimers();
import App from './App';
describe('App', () => {
  let wrapper = shallow(<App />);
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test('should get products of 40', () => {
    return wrapper.instance().getProducts().then(data => {
      expect(wrapper.state().products.length).toEqual(20);
      return wrapper.instance().getProducts().then(data => {
        expect(wrapper.state().products.length).toEqual(40);
      });
    });
  });

  test('should prefetch after timeout', () => {
    const spyPrefetch = jest.spyOn(wrapper.instance(), 'prefetch');
    expect.assertions(2);
    return wrapper.instance().getProducts().then(data => {
      expect(spyPrefetch).not.toBeCalled();
      // Fast-forward until all timers have been executed
      jest.runAllTimers();
      expect(spyPrefetch).toHaveBeenCalledTimes(1);
    });
  });

  test('should not make http request for prefetched data', () => {
    const spyGetProductsFromServer = jest.spyOn(wrapper.instance().productsService, 'getProductsFromServer');
    const spyGetProductsFromCache = jest.spyOn(wrapper.instance().productsService, 'getProductsFromCache');
    expect.assertions(2);
    return wrapper.instance().getProducts().then(data => {
      expect(spyGetProductsFromServer).not.toBeCalled();
      expect(spyGetProductsFromCache).toBeCalled();
    });
  });

  test('should only prefetch product once', () => {
    let a = wrapper.instance().prefetch();
    expect(a).toBeDefined();
    let b = wrapper.instance().prefetch();
    expect(b).toBeUndefined();
  });

  test('should switch sort when click different sort', () => {
    const mockedEvent = { target: { innerText: 'Price' } };
    wrapper.find("#app-sortby-price").simulate('click', mockedEvent);
    expect(wrapper.state('sortBy')).toEqual('price');
    expect(wrapper.state('products')).toHaveLength(0);
    expect(wrapper.state('fetching')).toEqual(false);
  });

  test('should Not switch sort when click same sort', () => {
    expect(wrapper.instance().onSortChange('id')).toBeUndefined();
    expect(wrapper.instance().onSortChange('price')).toBeDefined();
  });

  test('should get products in right sortBy when switching sortBy', () => {
    const mockedEvent = { target: { innerText: 'Price' } };
    wrapper.find("#app-sortby-price").simulate('click', mockedEvent);
    return wrapper.instance().getProducts().then(data => {
      let flag = true;
      for(let i = 1; i < data.length; ++i) {
        if(data[i].price < data[i-1].price) {
          flag = false;
        }
      }
      expect(flag).toEqual(true);
    });
  });

  test('should get products in right sortBy when switching sortBy during loading', () => {
    expect.assertions(2);
    wrapper.instance().getProducts().then(data => {
      expect(data).toBeUndefined();
    });
    const mockedEvent = { target: { innerText: 'Price' } };
    wrapper.find("#app-sortby-price").simulate('click', mockedEvent);
    return wrapper.instance().getProducts().then(data => {
      let flag = true;
      let products = wrapper.state().products;
      for(let i = 1; i < products.length; ++i) {
        if(products[i].price < products[i-1].price) {
          flag = false;
        }
      }
      expect(flag).toEqual(true);
    });
  });

  test('should handle reconnectClick', () => {
    wrapper.instance().handleReconnectClick();
    expect(wrapper.state('error')).toEqual(false);
  });

  test('should show end of catalogue when getting no more products', () => {
    const spygetProducts = jest.spyOn(wrapper.instance().productsService, 'getProducts');
    spygetProducts.mockReturnValueOnce(Promise.resolve({
      params: {
        sortBy: 'id'
      },
      products: []
    }));
    return wrapper.instance().getProducts().then(data => {
      expect(wrapper.state('hasMore')).toEqual(false);
      expect(wrapper.find('#app-end-catalogue').prop('style')['visibility']).toEqual('visible');
    });
  });
});
