import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView
} from 'react-native';
import { loadMessagesForPlace } from '../store/actions/messages';
import LAYOUT from '../constants/Layout';


import ChatArea from "../components/ChatArea/ChatArea";
import Map from "../components/Map/Map";

class MainScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    errors: { map: '', chat: '' },
    loading: false,
    expandChatArea: false,
  };

  loadMessagesForPlaceSelected = (placeId) => {
    const { loadMessagesForPlace } = this.props;
    this.setState({ loading: true, error: { chat: '', map: '' } }, () => {

    loadMessagesForPlace(placeId)
      .then(res => {
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false, errors: { chat: 'Error getting messages.' } });
        console.log('error from getting messages', err);
      });     
    });
  };

  toggleExpandChatArea = () => {
    this.setState({ expandChatArea: !this.state.expandChatArea });
  }

  render() {
    const { loading, errors } = this.state;

    return (
      <KeyboardAvoidingView 
        behavior="padding" 
        keyboardVerticalOffset={LAYOUT.keyboardVerticalOffset}
        style={styles.container}
      >
        <View style={styles.mapContainer}>
          <Map
            loadMessagesForPlaceSelected={this.loadMessagesForPlaceSelected}
            error={errors.map}
          />
        </View>
        <View style={this.state.expandChatArea ? styles.chatContainerExpanded : styles.chatContainer}>
          <ChatArea 
            error={errors.chat}
            loading={loading}
            toggleExpandChatArea={this.toggleExpandChatArea}
            expanded={this.state.expandChatArea}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    flex: 5
  },
  chatContainer: {
    flex: 4
  },
  chatContainerExpanded: {
    flex: 45
  }
});

const mapStateToProps = state => ({
  map: state.map,
  places: state.places
});

const mapDispatchToProps = dispatch => ({
  loadMessagesForPlace: (placeId) => dispatch(loadMessagesForPlace(placeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
