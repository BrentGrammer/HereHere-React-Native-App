import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import moment from 'moment';
import componentStyles from './styles';

class PrivateMessage extends React.Component {

  setUsername(fromUserId) {
    console.log('fromUserId in setusername in privatemessage.js', fromUserId);

    const { user, conversationSelected } = this.props;
    const { conversationWith } = conversationSelected;
    return fromUserId === user.userId ? user.username : conversationWith.username;
  };
  setAvatarUrl(fromUserId) {
    const { user, conversationSelected } = this.props;
    const { conversationWith } = conversationSelected;
    return fromUserId === user.userId ? user.avatarUrl : conversationWith.avatarUrl;
  };

  render() { 
    const { message } = this.props;
    const { createdAt, text, from: fromUserId } = message;
    const date = new Date(createdAt);
    const daySent = moment(date).format("M/D");
   
    return (
      <View 
        style={styles.messageItemContainer}
      >
          <Image 
            source={{ uri: this.setAvatarUrl(fromUserId) }}
            style={styles.image} 
          />  
          <View style={styles.chatMessageContainer}>
            <Text style={styles.chatMessageItem}>
              {this.setUsername(fromUserId)} ({daySent}): {text}
            </Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default PrivateMessage;