import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  keyboardVerticalOffset: 72 // estimated size of nav bar at top of screen - @TODO: try getting this programatically
};
