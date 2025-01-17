import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PlaceListItem = (props) => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Text>{props.description}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    padding: 10,
    marginBottom: 5.,
    flexDirection: 'row',
    alignItems: "center"
  }
});

export default PlaceListItem;