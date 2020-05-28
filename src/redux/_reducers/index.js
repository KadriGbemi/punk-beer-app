import beerActionTypes from '../_constants';

function rootReducer(state = {}, action) {
  switch (action.type) {
    case beerActionTypes.GET_BEERS:
      return Object.assign({}, state, {
        beers: (state.beers || []).concat(action.payload.response),
        isNextPage: action.payload.isNextPage,
        beerDetails: {},
      });
    case beerActionTypes.SAVE_SELECTED_BEER:
      return Object.assign({}, state, {
        beerDetails: action.payload,
        isNextPage: undefined,
      });
    case beerActionTypes.SET_PAGE:
      return Object.assign({}, state, {
        pageNumber: action.payload,
      });
    default:
      return Object.assign({}, state, {
        isNextPage: undefined,
      });
  }
}

export default rootReducer;
