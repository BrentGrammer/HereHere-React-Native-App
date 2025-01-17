import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableNativeFeedback
} from 'react-native';
import SuggestionsList from './SuggestionsList/SuggestionsList';
import componentStyles from './styles';

class PlacesSearchInput extends React.Component {

  render() {
    const { 
      suggestions, 
      search, 
      clearPlacesSearch, 
      onPlaceSuggestionPressed,
      onPlacesSearchInput, 
      onSubmitKeyPressed,
      error
    } = this.props;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.placesSearchInput}
          onChangeText={onPlacesSearchInput}
          value={search}
          placeholder="Search..."
          onSubmitEditing={onSubmitKeyPressed}
        />
        <View style={styles.clearButtonContainer}>
          <TouchableNativeFeedback onPress={clearPlacesSearch}>
            <Text style={styles.clearIcon}>&times;</Text>
          </TouchableNativeFeedback>
        </View>
        {!!error && <Text style={styles.errorMessage}>{error}</Text>}
        
        <SuggestionsList 
          suggestions={suggestions}
          onPlaceSuggestionPressed={onPlaceSuggestionPressed} 
          search={search}
        />    
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default PlacesSearchInput;