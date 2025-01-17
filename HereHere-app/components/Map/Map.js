import React from 'react';
import { connect } from 'react-redux';
import { Alert, StyleSheet, View, Text } from 'react-native'; 
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import PlacesSearch from '../PlacesSearch/PlacesSearch';
import UserLocationButton from './UserLocationButton';
import { storeMapRegion } from '../../store/actions/map';
import { storePlaceSelected, setPlaceResults } from '../../store/actions/places';
import componentStyles from './styles';
import { getPlaceData, generateNewMapCoords } from '../../util/places';
import { emitJoinChatRoom } from '../../services/socketIO';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: this.props.map.mapRegion,
      error: '',
      userLocation: {}
    };
  }

  //@TODO 
  // componentDidMount() {
  //   // Create user default or chosen region and put it in state.
  //   // MapRegion should be removed from store and just managed in this component and passed to places search
  // }

  onMapScrolled = (region) => {
    this.props.storeMapRegion(region);
  };

  onSuggestionPressed = (placeId, placeName) => {
    const { user, setPlaceResults, storePlaceSelected, storeMapRegion, loadMessagesForPlaceSelected } = this.props;
    getPlaceData(placeId, placeName)
      .then(placeData => {
        // send to store to trigger chat window with chat data for the place
        storePlaceSelected(placeData);
        setPlaceResults([ placeData ]);
    
        const newMapRegionCoords = generateNewMapCoords(placeData.coords);
        storeMapRegion(newMapRegionCoords);
        emitJoinChatRoom(user, placeData.placeId);
        return loadMessagesForPlaceSelected(placeData.placeId);   
      })
      .catch(err => {
        console.log('error getting place details', err);
        this.setState({ error: "There was an error getting place details." });
      });
  };

  onMarkerPressed = async (placeData) => {
    const { placeId, placeName, coords } = placeData;
    console.log('placeid', placeId)
    const { user, loadMessagesForPlaceSelected } = this.props;
    //@TODO: maybe create a separate query to only retrieve address_component field or make getplacedata 
    // take a fields parameter
    try {
      const placeDataWithCity = await getPlaceData(placeId, placeName);
      this.props.storePlaceSelected(placeDataWithCity);
    } catch (e) {
      console.log('error getting placedata', e)
    }

    const newMapRegionCoords = generateNewMapCoords(coords);
    this.props.storeMapRegion(newMapRegionCoords); 

    emitJoinChatRoom(user, placeId);
    loadMessagesForPlaceSelected(placeId);
  };

  // used to set zoom level when category keyword search is submitted
  setMapRegionDeltas = (regionDeltas) => {
    this.props.storeMapRegion(regionDeltas);
  };

  getUserLocation = async () => {
    this.setState({ error: '' });

    const hasLocationEnabled = await Location.hasServicesEnabledAsync();
    if (hasLocationEnabled === false) {
      Alert.alert('Permissions Denied', 'Please enable Location on your device.');
      return;
    }

    Permissions.askAsync(Permissions.LOCATION)
      .then(result => {
        if (result.status !== 'granted') {
          throw new Error('Location Permission Not Granted')
        }
      })  
      .then(res => {
        return Location.getCurrentPositionAsync({});
      })
      .then(userLocation => {
        const newMapRegionCoords = generateNewMapCoords(userLocation.coords);
        this.props.storeMapRegion(newMapRegionCoords);
      })
      .catch(err => {
        console.log('Error', err.message);
        this.setState({ error: err.message });
      });
  };

  render() {
    const { placeResults } = this.props.places;
    const { error } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.placeSearchInputContainer}>
          <PlacesSearch
            onSuggestionPressed={this.onSuggestionPressed} 
            setMapRegionDeltas={this.setMapRegionDeltas}
          />
        </View>
        <MapView
          style={styles.mapView}
          initialRegion={this.state.mapRegion}
          onRegionChangeComplete={this.onMapScrolled}
          region={this.props.map.mapRegion}
          showsUserLocation={true}
          moveOnMarkerPress={false}
        >
          {placeResults.length > 0 && placeResults.map(placeData => {
            const { placeId, coords, placeName, address } = placeData;
            return (
              <MapView.Marker 
                key={placeId} 
                coordinate={coords}
                title={placeName}
                description={address}
                onPress={() => { this.onMarkerPressed(placeData)}} 
                //onCalloutPress={() => { console.log('oncalloutpress fired')}} // fires when popup clicked
                //@TODO: assign onCalloutPressed to onMarkerPressed as well to pull up chat if user clicks there - 
                // cache the call to access web sockets????
              />
            );
          })}
         
        </MapView>
        {!!error && <Text style={styles.errorMessage}>{error}</Text>}
        <UserLocationButton getUserLocation={this.getUserLocation} />
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

const mapStateToProps = state => ({
  map: state.map,
  places: state.places,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  storeMapRegion: (region) => dispatch(storeMapRegion(region)),
  storePlaceSelected: (placeData) => dispatch(storePlaceSelected(placeData)),
  setPlaceResults: (placeResults) => dispatch(setPlaceResults(placeResults))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);