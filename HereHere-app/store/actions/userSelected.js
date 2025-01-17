import { STORE_USER_SELECTED } from './actionTypes';

// UserSelected: { username, avatarUrl, tagline, summary }
export const storeUserSelected = (userSelected) => ({
  type: STORE_USER_SELECTED,
  userSelected
});