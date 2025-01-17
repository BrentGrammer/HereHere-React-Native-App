import React from 'react';
import { connect } from 'react-redux';
import { TextInput, View, StyleSheet } from 'react-native';
import SuggestionsList from '../../../components/PlacesSearch/SuggestionsList/SuggestionsList';
import { getPlaceData, getPlaceSuggestions } from '../../../util/places';
import { storeUserInfo } from '../../../store/actions/user'; 
import { storeMapRegion } from '../../../store/actions/map';
import componentStyles from './styles';

class SelectCity extends React.Component {
  state = {
    city: {
      value: '',
      coords: {}
    },
    suggestions: []
  };

  onPlaceSuggestionPressed = ({ key, placeName }) => {
    const { storeUserInfo, storeMapRegion } = this.props;
    this.setState(prevState => ({ 
      suggestions: []
    }));

    getPlaceData(key, placeName)
      .then(placeData => {
        this.setState(prevState => ({ city: { ...prevState.city, value: placeData.city } }));
        storeUserInfo({ city: placeData.city }); 
        storeMapRegion(placeData.coords);
      });
  };

  onCityInputChange = (val) => {
    this.setState(prevState => {
      return {
        city: {
          ...prevState.city,
          value: val
        }
      };
    });

    if (val.length > 1) { 
      getPlaceSuggestions(val, ["(cities)"])
        .then(suggestions => {
          this.setState({ suggestions });
        });
    }
  };

  render() {
    const { city, suggestions } = this.state;

    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.textInput}
          placeholder="Enter a City..."
          value={city.value}
          onChangeText={this.onCityInputChange}
        /> 
        <SuggestionsList 
          onPlaceSuggestionPressed={this.onPlaceSuggestionPressed}
          search={city.value}
          suggestions={suggestions}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

const mapDispatchToProps = dispatch => ({
  storeUserInfo: (userInfo) => dispatch(storeUserInfo(userInfo)),
  storeMapRegion: (region) => dispatch(storeMapRegion(region))
});

export default connect(null, mapDispatchToProps)(SelectCity);














