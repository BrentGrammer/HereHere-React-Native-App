import React from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import ChatInput from '../../components/ChatInput/ChatInput';
import MessagesList from '../../components/MessagesList/MessagesList';
import componentStyles from './styles';
import { emitCreatePrivateMessage } from '../../services/socketIO';
import LAYOUT from '../../constants/Layout';

class PrivateMessagesScreen extends React.Component {
  static navigationOptions = {
    title: 'Private Messages'
  };

  sendMessage = (messageText) => {
    if (messageText.length === 0) {
      return;
    }
    this.setState({ loading: true });
 
    const privateMessage = this.generatePrivateMessageObject(messageText);

    emitCreatePrivateMessage(privateMessage)
      .then(res => {
        this.setState({ loading: false, messageSent: true });
      })
      .catch(err => {
        this.setState({ loading: false, error: 'Error sending Message.'});
      });
   };

  generatePrivateMessageObject = (messageText) => {
    const { conversationWith } = this.props.conversationSelected;
    const { user } = this.props;

    const privateMessage = { 
      text: messageText, 
      from: user.userId,
      to: conversationWith._id
    };
    return privateMessage;
  };

  filterMessagesByConversation = (messages) => {
    const { conversationSelected } = this.props;
    const filtered = messages.filter(message => {
      return message.conversationId === conversationSelected._id;
    });
    return filtered;
  };
 
  render() {
    const { messages } = this.props;
    const filteredMessagesByConversation = this.filterMessagesByConversation(messages);
 
    return (
        <KeyboardAvoidingView 
          behavior="padding"
          keyboardVerticalOffset={LAYOUT.keyboardVerticalOffset} 
          style={styles.container}
        >
          <MessagesList messages={filteredMessagesByConversation} />
          <ChatInput sendMessage={this.sendMessage} /> 
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

const mapStateToProps = state => ({
  messages: state.messages.private,
  user: state.user,
  conversationSelected: state.messages.conversationSelected
});

export default connect(mapStateToProps)(PrivateMessagesScreen);


