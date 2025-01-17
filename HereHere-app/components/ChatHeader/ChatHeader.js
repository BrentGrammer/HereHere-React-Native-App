import React from 'react';
import { 
  Text,
  View,
  StyleSheet
} from 'react-native';
import BackIcon from '../BackIcon/BackIcon';
import componentStyles from './styles';
import ExpandIcon from '../ui/ExpandIcon';

/**
 * props:
 *   onBackIconPressed - fn
 *   headerText - string
 *   showBackButton - bool
 *   toggleExpandChat - fn for expand icon
 */

class ChatHeader extends React.Component {
  render() {
    const { headerText, showBackButton = true, onBackIconPressed = () => {}, toggleExpandChat } = this.props;

    return (
      <View style={styles.chatHeaderContainer}>
        <View style={styles.buttonView}>
          {showBackButton && <BackIcon onBackIconPressed={onBackIconPressed} />}
        </View>
        <Text style={styles.chatHeader}>{headerText}</Text>
        <View style={[styles.buttonView, styles.rightButtonView]}>
          <ExpandIcon onPress={toggleExpandChat} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default ChatHeader;