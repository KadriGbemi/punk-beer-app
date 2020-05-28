import axios from 'axios';

axios.defaults.baseURL = 'https://api.punkapi.com/v2/';

export default async function getBeersRequest(page) {
  const response = await axios.get(`/beers?page=${page}&per_page=10`);
  return response.data;
}
