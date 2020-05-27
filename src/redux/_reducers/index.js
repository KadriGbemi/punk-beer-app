import beerActionTypes from '../_constants';

function rootReducer(state = {}, action) {
  switch (action.type) {
    case beerActionTypes.GET_BEERS:
      console.log('Get beers reducer', action);
      return Object.assign({}, state, {
        beers: action.payload,
      });
    case beerActionTypes.SAVE_SELECTED_BEER:
      return Object.assign({}, state, {
        beerDetails: action.payload,
      });
    default:
      return state;
  }
}

export default rootReducer;
