import React from "react";
import { connect } from "react-redux";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableOpacity,  
} from "react-native";
import Chat from "../Chat/Chat";
import ChatHeader from "../ChatHeader/ChatHeader";
import { emitCreateMessage } from "../../services/socketIO";
import LatestActivity from "./LatestActivity/LatestActivity";
import {
  storePlaceSelected,
  setPlaceResults,
} from "../../store/actions/places";
import { unsetPublicMessages } from "../../store/actions/messages";
import { emptyRoomUsersList } from "../../store/actions/chat";
import componentStyles from "./styles";

class ChatArea extends React.Component {
  state = {
    keyboardShowing: false
  };

  componentDidMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  }

  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
    this.keyboardDidShowListener.remove();
  }

  _keyboardDidHide = () => {
    this.setState({ keyboardShowing: false });
  };

  _keyboardDidShow = () => {
    this.setState({ keyboardShowing: true });
  };

  sendMessage = (chatInput) => {
    if (!chatInput.length > 0) {
      return;
    }
    const messageData = this.generatePlaceMessageObject(chatInput);
    //@TODO Make acknowledgement here to catch errors
    emitCreateMessage(messageData);
    Keyboard.dismiss();
  };

  generatePlaceMessageObject = (chatInput) => {
    const {
      placeId,
      placeName,
      coords,
      city,
      address,
    } = this.props.placeSelected;
    const { username, avatarUrl, tagline, summary } = this.props.user;

    const messageData = {
      place: {
        placeId,
        placeName,
        coords,
        address,
      },
      user: {
        username,
        avatarUrl,
        tagline,
        summary,
      },
      city,
      text: chatInput,
    };
    return messageData;
  };

  onBackIconPressed = () => {
    this.props.setPlaceResults([]);
    this.props.emptyRoomUsersList();
    this.props.unsetPublicMessages();
    this.props.storePlaceSelected(null);
  };

  renderInstructions = () => (
    <>
      <Text style={styles.placeholderMessage}>
        1) Search for a place or category (i.e. Restaurants)...
      </Text>
      <Text style={styles.placeholderMessage}>
        2) Select a place to chat or network with others who are there.
      </Text>
    </>
  );

  render() {
    const { placeName } = this.props.placeSelected;
    const { messages, error, loading, expanded } = this.props;
    // const shortCityName = user.city !== "World" ? user.city.slice(0, city.indexOf(",")) : user.city;
    // TODO: allow for the selection of a city for latest activity

    if (!placeName) {
      return (
        <View style={styles.container}>
          {!expanded && this.renderInstructions()}
          {!this.state.keyboardShowing && <View style={styles.latestActivityContainer}>
            <ChatHeader
              headerText={`Latest Activity (World):`}
              showBackButton={false}
              toggleExpandChat={this.props.toggleExpandChatArea}
            />
            <LatestActivity city={"World"} />
          </View>}
        </View>
      );
    } else if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ChatHeader
            headerText={`Chat for ${placeName.toUpperCase()}:`}
            onBackIconPressed={this.onBackIconPressed}
            toggleExpandChat={this.props.toggleExpandChatArea}
          />
          <Chat
            messages={messages}
            sendMessage={this.sendMessage}
            error={error}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create(componentStyles);

const mapDispatchToProps = (dispatch) => ({
  unsetPublicMessages: () => dispatch(unsetPublicMessages()),
  storePlaceSelected: (place) => dispatch(storePlaceSelected(place)),
  emptyRoomUsersList: () => dispatch(emptyRoomUsersList()),
  setPlaceResults: (placeResults) => dispatch(setPlaceResults(placeResults)),
});

const mapStateToProps = (state) => ({
  user: state.user,
  placeSelected: state.places.placeSelected,
  messages: state.messages.public,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatArea);
