import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import componentStyles from './styles';

const LogoutButton = props => {

  const onPress = () => {
    props.navigation.navigate('Landing');
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.logoutButton}>Login</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(componentStyles);

export default withNavigation(LogoutButton);