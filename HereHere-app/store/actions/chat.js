import { STORE_ROOM_USERSLIST, EMPTY_ROOM_USERSLIST } from './actionTypes';

export const storeRoomUsersList = (roomUsersList) => ({
  type: STORE_ROOM_USERSLIST,
  roomUsersList
}); 

export const emptyRoomUsersList = () => ({
  type: EMPTY_ROOM_USERSLIST
});