import React from 'react';
import { shallow } from 'enzyme';
import Advertisement from './Advertisement';
describe('Advertisement', () => {
  const wrapper = shallow(<Advertisement id={1} />);
  let id = 1;
  let ad =
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <div className="thumbnail card">
        <img className="ads" src={'/ad/?r=' + id} alt={'/ad/?r=' + id} />
      </div>
    </div>;
  test('should render an img tag', () => {
    expect(wrapper.contains(ad)).toEqual(true);
  });

  test('should update an img tag', () => {
    wrapper.setProps({ id: 2 });
    expect(wrapper.find('img').prop('src')).toEqual('/ad/?r=2');
  });
});
