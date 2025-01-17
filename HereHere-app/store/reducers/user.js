import { STORE_USER_INFO, STORE_AVATAR_URL } from '../actions/actionTypes';
import APP_CONSTANTS from '../../constants/App';

const initialState = {
  username: 'User',
  userId: null,
  email: null,
  avatarUrl: APP_CONSTANTS.GENERIC_AVATAR_URL, //@TODO change this to a static asset that comes with the app? for guests
  city: "Denver,Colorado,United States",
  tagline: '',
  summary: '',
  token: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_INFO:
      return {
        ...state,
        ...action.userInfo 
      };
    case STORE_AVATAR_URL:
      return {
        ...state,
        avatarUrl: action.avatarUrl
      };
    default:
      return state;
  }
};