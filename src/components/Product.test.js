import React from 'react';
import { shallow } from 'enzyme';
import Product from './Product';
describe('Product', () => {
  const product = {
    "id": "20-mjp5teowpekjgx8niok0ozuxr",
    "size": 26,
    "price": 260,
    "face": "(à² _à² )"
  };
  const wrapper = shallow(<Product product={product} key={product.id} />);
  test('should render product text', () => {
    expect(wrapper.find('.productId').text()).toEqual(product.id);
  });
  test('should render currency text', () => {
    expect(wrapper.find('.currency').text()).toEqual('$260.00');
  });
  test('should render face style', () => {
    expect(wrapper.find('.face').prop('style')['fontSize']).toEqual(product.size + 'px');
  });
  test('should render face text', () => {
    expect(wrapper.find('.face').text()).toEqual(product.face);
  });
});
