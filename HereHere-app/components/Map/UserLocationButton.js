import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Icon from '@expo/vector-icons';
import componentStyles from './styles';

class UserLocationButton extends React.Component {

  getUserLocation = () => {
    this.props.getUserLocation();
  };

  render() {
    return (
      <View style={styles.userLocationButtonContainer}>
        <TouchableOpacity 
          onPress={this.getUserLocation}
          style={styles.userLocationButton}
        >
          <Icon.Ionicons
            name="md-locate"
            size={30}
          /> 
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default UserLocationButton;

