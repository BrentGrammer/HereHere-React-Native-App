import { createDrawerNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';
import Drawer from './Drawer';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import LinksScreen from '../../screens/LinksScreen';
import PrivacyScreen from '../../screens/PrivacyScreen/PrivacyScreen';
import MainTabNavigator from '../MainTabNavigator';

export default createDrawerNavigator(
  {
    Home: { screen: MainTabNavigator },
    Profile: { screen: ProfileScreen },
    Links: { screen: LinksScreen},
    Privacy: { screen: PrivacyScreen },
    
  },
  {
    initialRouteName: 'Home',
    contentComponent: Drawer,
    drawerWidth: Dimensions.get('window').width - 120, 
  }
);