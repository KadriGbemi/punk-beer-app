import axios from 'axios';
import beerActionTypes from '../_constants';
import getBeersRequest from '../../_requests/api';

axios.defaults.baseURL = 'https://api.punkapi.com/v2/';

export function getBeers(page) {
  return async (dispatch) => {
    try {
      const response = await getBeersRequest(page);
      if (response.length > 0) {
        dispatch({
          type: beerActionTypes.GET_BEERS,
          payload: { response, isNextPage: true },
        });
      } else {
        dispatch({
          type: beerActionTypes.GET_BEERS,
          payload: { response, isNextPage: false },
        });
      }
    } catch (error) {
      dispatch({
        type: beerActionTypes.GET_BEERS_ERROR,
        payload: { data: error, isNextPage: false },
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

export function setPage(pageNumber) {
  return {
    type: beerActionTypes.SET_PAGE,
    payload: pageNumber,
  };
}
