import React from 'react';
import { createStackNavigator } from 'react-navigation';
import DrawerToggleIcon from '../components/DrawerToggleIcon';
import DrawerNavigator from './DrawerNavigator/DrawerNavigator';

export default createStackNavigator({
  DrawerNavigator:{ 
    screen: DrawerNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'HereHere',  // Title to appear in status bar
      headerLeft: <DrawerToggleIcon navigation={navigation} />,
      headerStyle: { backgroundColor: '#333' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' }
    }) 
  }
});