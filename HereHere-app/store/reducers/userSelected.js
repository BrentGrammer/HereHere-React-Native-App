import { STORE_USER_SELECTED } from '../actions/actionTypes';
import APP_CONSTANTS from '../../constants/App';

const initialState = {
  userId: null,
  username: 'User',
  avatarUrl: APP_CONSTANTS.GENERIC_AVATAR_URL,
  tagline: '',
  summary: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_SELECTED:
      return {
        ...state,
        ...action.userSelected 
      };
    default:
      return state;
  }
};