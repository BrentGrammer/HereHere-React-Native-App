import textShadowStyle from '../../constants/TextShadow';

export const drawerMenuItemStyle = {
  ...textShadowStyle,
  fontSize: 16,
  fontStyle: 'italic'
};

export default {
  container: {
    flex: 1
  },
  drawerMenuItem: drawerMenuItemStyle,
  paddingLeft: 10,
  PaddingRight: 10
}