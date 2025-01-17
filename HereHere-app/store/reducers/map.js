import { STORE_MAP_REGION } from "../actions/actionTypes";
import { Dimensions } from "react-native";

const initialState = {
  mapRegion: {
    latitude: 39.7531332,
      longitude: -105.0087434,
      latitudeDelta: 0.0122,
      longitudeDelta: 
        Dimensions.get("window").width / 
        Dimensions.get("window").height * 
        0.0122
    }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_MAP_REGION: 
      return {
        ...state,
        mapRegion: { ...state.mapRegion, ...action.mapRegion }
      };
    default: 
      return state;
  };
};