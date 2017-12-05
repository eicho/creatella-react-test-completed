jest.mock('../services/restAPI');
import ProductsService from './products.service';
describe('Producets service', () => {
  var pService = new ProductsService();
  test('should get products of 1', () => {
    let params = {
      sortBy: 'id',
      limit: 1,
      skip: 0
    }
    expect(pService.getProducts(params)).resolves.toEqual({ "params": { "limit": 1, "skip": 0, "sortBy": "id" }, "products": [{ "face": "( .-. )", "id": "0-", "price": 1, "size": 10 }] });
  });

  test('should get products of 10', () => {
    let params = {
      sortBy: 'id',
      limit: 10,
      skip: 0
    }
    expect(pService.getProducts(params)).resolves.toEqual(
      {
        "params": {
          "limit": 10,
          "skip": 0,
          "sortBy": "id"
        },
        "products": [
          {
            "face": "( .-. )",
            "id": "0-",
            "price": 1,
            "size": 10
          },
          {
            "face": "( .o.)",
            "id": "1-",
            "price": 1,
            "size": 10
          },
          {
            "face": "( `·´ )",
            "id": "2-",
            "price": 1,
            "size": 10
          },
          {
            "face": "( ° ͜ ʖ °)",
            "id": "3-",
            "price": 1,
            "size": 10
          },
          {
            "face": "( ͡° ͜ʖ ͡°)",
            "id": "4-",
            "price": 1,
            "size": 10
          },
          {
            "face": "( ⚆ _ ⚆ )",
            "id": "5-",
            "price": 1,
            "size": 10
          },
          {
            "face": "( ︶︿︶)",
            "id": "6-",
            "price": 1,
            "size": 10
          },
          {
            "face": "( ﾟヮﾟ)",
            "id": "7-",
            "price": 1,
            "size": 10
          },
          {
            "face": "(\\/)(°,,,°)(\\/)",
            "id": "8-",
            "price": 1,
            "size": 10
          },
          {
            "face": "(¬_¬)",
            "id": "9-",
            "price": 1,
            "size": 10
          }
        ]
      }
    );
  });

  test('should hit cache', () => {
    let params = {
      sortBy: 'id',
      limit: 10,
      skip: 0
    }
    var hit = pService.hitcache;
    expect(pService.getProductsFromCache(pService.getCacheKey(params))).toEqual([
      {
        "face": "( .-. )",
        "id": "0-",
        "price": 1,
        "size": 10
      },
      {
        "face": "( .o.)",
        "id": "1-",
        "price": 1,
        "size": 10
      },
      {
        "face": "( `·´ )",
        "id": "2-",
        "price": 1,
        "size": 10
      },
      {
        "face": "( ° ͜ ʖ °)",
        "id": "3-",
        "price": 1,
        "size": 10
      },
      {
        "face": "( ͡° ͜ʖ ͡°)",
        "id": "4-",
        "price": 1,
        "size": 10
      },
      {
        "face": "( ⚆ _ ⚆ )",
        "id": "5-",
        "price": 1,
        "size": 10
      },
      {
        "face": "( ︶︿︶)",
        "id": "6-",
        "price": 1,
        "size": 10
      },
      {
        "face": "( ﾟヮﾟ)",
        "id": "7-",
        "price": 1,
        "size": 10
      },
      {
        "face": "(\\/)(°,,,°)(\\/)",
        "id": "8-",
        "price": 1,
        "size": 10
      },
      {
        "face": "(¬_¬)",
        "id": "9-",
        "price": 1,
        "size": 10
      }
    ]);
  });
});
