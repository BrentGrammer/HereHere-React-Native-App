import React from 'react';
import { connect } from 'react-redux';
import { 
  StyleSheet,
  Text,
  View
} from 'react-native';
import MessagesList from '../MessagesList/MessagesList';
import ChatInput from '../ChatInput/ChatInput';
import componentStyles from './styles';
/**
 * Props:
 *   sendMessage
 *   messages
 *   error
 */
class Chat extends React.Component {

  sendMessage = (chatInput) => {
    this.props.sendMessage(chatInput);
  };

  render() {
    const { messages, error } = this.props;

    return (
       <View style={styles.container}>
          {!!error && <Text style={styles.error}>({error})</Text>}
          {
            messages.length === 0 && !error 
            ? <Text style={styles.noMessagesText}>No Recent Messages...</Text> 
            : <MessagesList messages={messages} />
          }
          <ChatInput sendMessage={this.sendMessage} />
      </View>
    ); 
  }
}

const styles = StyleSheet.create(componentStyles);

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(Chat);