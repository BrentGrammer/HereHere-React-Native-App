import { SET_LOADING } from '../actions/actionTypes';

initialState = {
  loading: false
};

const flagsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    default:
      return state;
  }
};

export default flagsReducer;