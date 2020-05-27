import axios from 'axios';

axios.defaults.baseURL = 'https://api.punkapi.com/v2/';

export function getBeersRequest() {
  return axios.get('/beers').then((response) => response.data);
}

export function getBeersAnother() {
  return axios.get('/beers').then((response) => response.data);
}
