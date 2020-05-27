import axios from 'axios';
import beerActionTypes from '../_constants';
import { getBeersRequest } from '../../_requests/api';

axios.defaults.baseURL = 'https://api.punkapi.com/v2/';

export function getBeers() {
  return async (dispatch) => {
    try {
      const response = await getBeersRequest();
      dispatch({
        type: beerActionTypes.GET_BEERS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: beerActionTypes.GET_BEERS_ERROR,
        payload: error,
      });
    }
  };
}

export function saveSelectedBeer(item) {
  return {
    type: beerActionTypes.SAVE_SELECTED_BEER,
    payload: item,
  };
}
