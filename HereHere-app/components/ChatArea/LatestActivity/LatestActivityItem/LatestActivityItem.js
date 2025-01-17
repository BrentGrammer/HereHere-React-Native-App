import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { storePlaceSelected, setPlaceResults } from '../../../../store/actions/places';
import { storeMapRegion } from '../../../../store/actions/map';
import { generateNewMapCoords } from '../../../../util/places';
import { emitJoinChatRoom } from '../../../../services/socketIO';
import { loadMessagesForPlace } from '../../../../store/actions/messages';
import componentStyles from './styles';

class LatestActivityItem extends React.Component {

  onLatestActivityItemPressed = () => {
    const { storeMapRegion, storePlaceSelected, setPlaceResults, message, user } = this.props;
    const { placeId, address, coords, placeName } = message.place;

    const placeData = { 
      placeId, 
      address, 
      coords: { latitude: coords.latitude, longitude: coords.longitude }, 
      placeName, 
      city: user.city 
    };

    const newMapRegionCoords = generateNewMapCoords(placeData.coords);
    storeMapRegion(newMapRegionCoords);
    storePlaceSelected(placeData);
    setPlaceResults([ placeData ]);

    const { userId, username, email, avatarUrl, tagline, summary } = this.props.user;
    const userData = { userId, username, email, avatarUrl, tagline, summary };

    emitJoinChatRoom(userData, placeData.placeId);
    
    this.props.loadMessagesForPlace(placeData.placeId)
      .then(res => {
        //this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false, errors: { chat: 'Error getting messages.' } });
        console.log('error from getting messages', err);
      });     
  };

  render() { 
    const { message } = this.props;
    const { user, createdAt, text } = message;
    const { placeName } = message.place;
    const date = new Date(createdAt);
    const time = moment(date).fromNow();

    return (
      <TouchableOpacity onPress={this.onLatestActivityItemPressed}>
        <View style={styles.container}>     
          <Image 
            source={{ uri: user.avatarUrl }}
            style={styles.image} 
          />  
          <Text style={styles.messageItem}>
            {placeName} ({time}): {text}
          </Text>    
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>({
  storePlaceSelected: (place) => dispatch(storePlaceSelected(place)),
  setPlaceResults: (placeResults) => dispatch(setPlaceResults(placeResults)),
  storeMapRegion: (mapRegion) => dispatch(storeMapRegion(mapRegion)),
  loadMessagesForPlace: (placeId) => dispatch(loadMessagesForPlace(placeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(LatestActivityItem);
