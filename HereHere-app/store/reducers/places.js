import { STORE_PLACE_SELECTED, SET_PLACE_RESULTS } from '../actions/actionTypes';

const initialState = {
  placeSelected: {
    placeId: '',
    placeName: '',
    address: '',
    coords: {},
    city: ''
  },
  placeResults: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_PLACE_SELECTED:
      if (action.placeData === null) {
        return { ...state, ...initialState };
      }
      return {
        ...state,
        placeSelected: {
          ...action.placeData
        }
      };
    case SET_PLACE_RESULTS:
      return {
        ...state,
        placeResults: action.placeResults
      }
    default:
      return state;
  }
};