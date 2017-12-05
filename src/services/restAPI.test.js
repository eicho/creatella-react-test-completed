import axios from 'axios';
jest.mock('axios');
import { get } from './restAPI';
describe('RestAPI service', () => {
  test('should call get', () => {
    const url = '/some/url';
    const params = {
      sort: 'id',
      limit: 10,
      skip: 0
    }
    get(url, params);
    expect(axios.get.mock.calls[0][0]).toBe(url);
    expect(axios.get.mock.calls[0][1].params.sort).toBe(params.sort);
    expect(axios.get.mock.calls[0][1].params.limit).toBe(params.limit);
    expect(axios.get.mock.calls[0][1].params.skip).toBe(params.skip);
  });

});