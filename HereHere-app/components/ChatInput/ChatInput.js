import React from 'react';
import { 
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import * as Icon from '@expo/vector-icons';
import componentStyles from './styles';
import Colors from '../../constants/Colors';

/**
 * props:
 *   sendMessage(chatInput)
 */
class ChatInput extends React.Component {
  state = {
    chatInput: ''
  };

  sendMessage = () => {  
    const { chatInput } = this.state;
    this.props.sendMessage(chatInput);
    this.setState({ chatInput: '' });
  };
  
  onChatInput = (val) => {
    this.setState({ chatInput: val });
  };

  render() {
    return (
      <View style={styles.chatInputContainer}>
        <TextInput
          style={styles.chatTextInput}
          onChangeText={this.onChatInput}
          value={this.state.chatInput}
          placeholder="Enter Message..."
          maxLength={200}
        />
        <TouchableOpacity 
          style={styles.sendMessageButton}
          onPress={this.sendMessage}
        >
          <Icon.Ionicons
            name="md-send"
            size={26}
            color={Colors.tintColor}
          /> 
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default ChatInput;