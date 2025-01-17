import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Icon from '@expo/vector-icons'
import Colors from '../../constants/Colors';
import componentStyles from './styles';

const ExpandIcon = ({ onPress = () => {} }) => {
    return (
      <View>
        <TouchableOpacity 
          style={styles.expandIcon}
          onPress={onPress}
        >
        <Icon.MaterialCommunityIcons
          name="arrow-expand-vertical"
          size={26}
          color={Colors.tintColor}
        /> 
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create(componentStyles);

export default ExpandIcon;
