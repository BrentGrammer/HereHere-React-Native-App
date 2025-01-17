import { SET_LOADING } from './actionTypes';

export const setLoadingFlag = (loading = true) => ({
  type: SET_LOADING,
  loading
}); 