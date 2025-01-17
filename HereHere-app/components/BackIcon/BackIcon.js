import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Icon from '@expo/vector-icons'
import Colors from '../../constants/Colors';
import componentStyles from './styles';

class BackIcon extends React.Component {

  goBack = () => {
    this.props.onBackIconPressed();
  };

  render() {
    return (
      <View>
        <TouchableOpacity 
          style={styles.backIcon}
          onPress={this.goBack}
        >
        <Icon.Ionicons
          name="md-arrow-back"
          size={26}
          color={Colors.tintColor}
        /> 
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default BackIcon;
