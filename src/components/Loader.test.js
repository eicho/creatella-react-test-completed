import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Loader from './Loader';

describe('Loader', () => {
  let onClickCalled = false;

  const wrapper = shallow(<Loader onClick={() => { onClickCalled = true; }} error={false} hasMore={true} />);
  const loader_loading = 'Loading ...';
  const loader_error = 'Network connection failed ... Please retry';
  test('should render loading text', () => {
    expect(wrapper.text()).toEqual(loader_loading);
  });
  test('should render error text', () => {
    wrapper.setProps({ error: true });
    expect(wrapper.text()).toEqual(loader_error);
  });
  test('should call onClick when retry clicked', () => {
    expect(onClickCalled).toEqual(false);
    wrapper.find('a').simulate('click');
    expect(onClickCalled).toEqual(true);
  });
});
