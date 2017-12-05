import React from 'react';
import { shallow } from 'enzyme';
import ProductsGrid from './ProductsGrid';
describe('ProductsGrid', () => {
  let products = [
    // {id: "0-locmlw9ji6ua1u7cap4pctyb9", size: 40, price: 827, face: "( .-. )"},
    // {id: "1-yv33ao12vxec6x89uts9ejyvi", size: 27, price: 973, face: "( .o.)"},
    // {id: "2-bh93fhu2gfbjnikhejhflayvi", size: 12, price: 423, face: "( `·´ )"},
    // {id: "3-40k5jbtl0vcvo4xv8qsvcs1yvi", size: 34, price: 3, face: "( ° ͜ ʖ °)"},
    // {id: "4-jph4evv3q6572tptmsgyi7ldi", size: 21, price: 111, face: "( ͡° ͜ʖ ͡°)"},
    // {id: "5-8swcxr84fjowums7o4mtpgb9", size: 17, price: 1, face: "( ⚆ _ ⚆ )"},
    // {id: "6-pw383vony6pd4u8jm21nvobt9", size: 28, price: 499, face: "( ︶︿︶)"},
    // {id: "7-99nso0einb6tybvrd0omoswcdi", size: 18, price: 730, face: "( ﾟヮﾟ)"},
    // {id: "8-rqmz6qz7lg66qo7a7do7jh5mi", size: 12, price: 564, face: "(\/)(°,,,°)(\/)"},
    // {id: "9-zq3bdtr64uig60x84rmcgnwmi", size: 20, price: 360, face: "(¬_¬)"},
    // {id: "10-784cjloc0ymsyrbxyghaug14i", size: 18, price: 993, face: "(¬º-°)¬"},
    // {id: "11-y0lg0cnpi2to2xsur3z3erk9", size: 16, price: 160, face: "(¬‿¬)"},
    // {id: "12-lyzeoa40ur33rljdbzb79cnmi", size: 27, price: 508, face: "(°ロ°)☝"},
    // {id: "13-uvz4jwdwz8l5bkwot0yynwmi", size: 37, price: 458, face: "(´・ω・)っ"},
    // {id: "14-5jt0k4heyyb406fmo96ccgzaor", size: 34, price: 425, face: "(ó ì_í)"},
    // {id: "15-lr6vvrobe1dlbmtz0p8ehfr", size: 27, price: 443, face: "(ʘᗩʘ')"},
    // {id: "16-1mo5cd2k8uqx21xyaxdj0b2o6r", size: 23, price: 381, face: "(ʘ‿ʘ)"},
    // {id: "17-8uhfy5765zjx95l31ficw61or", size: 19, price: 587, face: "(̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄"},
    // {id: "18-9jqnfzx4omnow40johkf0f6r", size: 31, price: 193, face: "(͡° ͜ʖ ͡°)"},
    // {id: "19-qrus50sg0c2rl5tra7ix80k9", size: 40, price: 936, face: "ᕦ( ͡° ͜ʖ ͡°)ᕤ"}
  ];
  let count = 20;
  for (let i = 0; i < count; ++i) {
    products.push({ id: i, size: 40, price: 827, face: "( .-. )" });
  }
  const wrapper = shallow(<ProductsGrid products={products} />);
  test('should render products grid', () => {
    expect(wrapper.find('.products-grid')).toBeDefined();
  });
  test('should render as many cards as supplied: 20', () => {
    let adsCount = Math.floor(products.length / 20);
    expect(wrapper.children().length).toEqual(products.length + adsCount);
  });

  test('should render as many cards as supplied: 40', () => {
    for (let i = 0; i < count; ++i) {
      products.push({ id: i, size: 40, price: 827, face: "( .-. )" });
    }
    wrapper.setProps({ products: products });
    let adsCount = Math.floor(products.length / 20);
    expect(wrapper.children().length).toEqual(products.length + adsCount);
  });

  test('should not show the same ads in a row', () => {
    for (let i = 0; i < 200; ++i) {
      products.push({ id: i, size: 40, price: 827, face: "( .-. )" });
    }
    wrapper.setProps({ products: products });
    let adsId = wrapper.instance().adsIds;
    let flag = false;
    for (let i = 1; i < adsId.length; ++i) {
      if (adsId[i] === adsId[i - 1]) {
        flag = true;
        break;
      }
    }
    expect(flag).toEqual(false);
  });

  test('should render 0 cards when set products empty', () => {
    wrapper.setProps({ products: [] });
    expect(wrapper.children().length).toEqual(0);
  });
});
