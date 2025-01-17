import React, {Component} from 'react';
import {
  ActivityIndicator,
  Button,
  Modal, 
  Text,
  TextInput, 
  View, 
  StyleSheet} from 'react-native';
import { emitCreatePrivateMessage } from '../../services/socketIO';
import componentStyles from './styles';

/**
 * props:
 *  userSelected
 *  user
 *  visible
 *  setModalVisible
 *
 */

class SendMessageModal extends Component {

  state = {
    messageText: '',
    loading: false,
    messageSent: false,
    error: ''
  };

  componentDidMount() {
    this.setState({ messageText: '', loading: false, messageSent: false, error: '' });
  }

  onRequestClose = () => {
    this.setState({ messageText: '', loading: false, error: '', messageSent: false }, () => {
      this.props.setModalVisible(false);
    });
  };

  onTextInputChange = (val) => {
    this.setState({ messageText: val });
  };

  sendMessage = () => {
    const { messageText } = this.state;
    if (messageText.length === 0) {
      return;
    }
    this.setState({ loading: true, error: '' });

    const { user, userSelected } = this.props;
    const privateMessage = { 
      text: messageText, 
      from: user.userId,
      to: userSelected.userId
    };

    emitCreatePrivateMessage(privateMessage)
      .then(res => {
        this.setState({ loading: false, messageSent: true });
      })
      .catch(err => {
        this.setState({ loading: false, error: 'Error sending Message.'});
      });
  };

  render() {
    const { visible, userSelected } = this.props;
    const { loading, messageSent, error } = this.state;
    let content = null;

    if (loading) {
      content = <ActivityIndicator size="large" />;
    } else if (!messageSent) {
      content = <View>
                  <Text style={styles.headerText}>Enter Message to {userSelected.username}:</Text>
                  <TextInput 
                    style={styles.messageTextInput}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={this.onTextInputChange}
                    value={this.state.messageText}
                  />
                  <Button onPress={this.sendMessage} title="Send Message" />
                  {!!error && <Text>{error}</Text>}
                </View>;
    } else if (messageSent) {
      content = <Text style={styles.successText}>Message Sent!</Text>;
    }

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={this.onRequestClose}
        >
          <View style={styles.contentContainer}>
            <Button title="Go Back" onPress={this.onRequestClose} />
            {content}
          </View>

        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default SendMessageModal;