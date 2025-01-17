import React from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import componentStyles from './styles';

class ConversationListItem extends React.Component {

  onListItemPressed = () => {
    this.props.onConversationPressed(this.props.conversation);
  };

  render() {
    const { conversation, prefix } = this.props;
    const { conversationWith, lastUpdateMessageText, lastUpdated } = conversation;
    const { username, tagline, avatarUrl } = conversationWith;
    console.log('conversationWith: ', conversationWith)
    const messageSnippet = lastUpdateMessageText.slice(0, 40) + '...';
    const dateSent = moment(lastUpdated).format("MMM Do");

    return (
      <TouchableOpacity style={styles.container} onPress={this.onListItemPressed}>
        <Image 
          source={{ uri: avatarUrl }}
          style={styles.image} 
        />  
        <View style={styles.conversationInfoContainer}>
          <Text style={prefix === 'From' ? [styles.userText, { fontWeight: 'bold' }] : styles.userText}>
            {prefix}: {username} - {tagline.length > 0 ? tagline : '(No Tagline Provided)'}
          </Text>
          <Text style={styles.messageSnippetText}>({dateSent}) {messageSnippet}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default ConversationListItem;


