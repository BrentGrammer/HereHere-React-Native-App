import { STORE_ROOM_USERSLIST, EMPTY_ROOM_USERSLIST } from '../actions/actionTypes';

const initialState = {
  room: {
    usersList: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_ROOM_USERSLIST:
      return {
        ...state,
        room: {
          ...state.room,
          usersList: action.roomUsersList
        }
      };
    case EMPTY_ROOM_USERSLIST:
      return {
        ...state,
        room: {
          ...state.room,
          usersList: []
        }
      };
    default:
      return state;
  }
};