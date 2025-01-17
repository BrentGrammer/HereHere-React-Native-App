import { STORE_PLACE_SELECTED, SET_PLACE_RESULTS } from "./actionTypes";

export const storePlaceSelected = (placeData = null) => ({
  type: STORE_PLACE_SELECTED,
  placeData
});

export const setPlaceResults = (placeResults) => ({
  type: SET_PLACE_RESULTS,
  placeResults
});

