import React from 'react';
import { DrawerActions } from 'react-navigation';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as Icon from '@expo/vector-icons';

const DrawerToggleIcon = props => {

  toggleDrawer = () => {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <TouchableOpacity style={styles.menuIcon} onPress={this.toggleDrawer}>
      <Icon.Ionicons
        name="md-menu"
        size={40}
        color='white'
      /> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    marginLeft: 15
  }
})

export default DrawerToggleIcon;
