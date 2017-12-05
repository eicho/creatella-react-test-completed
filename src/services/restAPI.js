import axios from 'axios';

function get(url, params) {
  return axios.get(url, {
    params: params
  });
}

export {
  get
};