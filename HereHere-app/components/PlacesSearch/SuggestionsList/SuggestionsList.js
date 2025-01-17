import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PlaceListItem from '../../PlaceListItem/PlaceListItem';
import componentStyles from './styles';

const SuggestionsList = (props) => {
  const { onPlaceSuggestionPressed, suggestions, search } = props;

  showSuggestionsList = () => {
    if (suggestions.length > 0 && search.length > 1) {
      return true;
    }
    return false;
  };

  // item will have { key: <placeId String>, title: <description String>, placeName: <name String>}
  const renderListItem = ({item}) => {
    return (
      <PlaceListItem  
        description={item.title}
        onItemPressed={() => onPlaceSuggestionPressed(item)} 
      />
    );
  };


  return (
    showSuggestionsList() &&
    <View style={styles.searchListContainer}>
      <FlatList 
        data={suggestions}
        renderItem={renderListItem}
      />
    </View>
  );
};

const styles = StyleSheet.create(componentStyles);

export default SuggestionsList;