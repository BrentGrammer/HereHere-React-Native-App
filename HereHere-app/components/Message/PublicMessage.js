import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import UserInfoModal from '../UserInfoModal/UserInfoModal';
import componentStyles from './styles';

class PublicMessage extends React.Component {
  state = {
    modalVisible: false
  };

  onAvatarPress = () => {
    this.setModalVisible(true);
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() { 
    const { message } = this.props;
    const { user, createdAt, text } = message;
    const { modalVisible } = this.state;
    const date = new Date(createdAt);
    const time = moment(date).fromNow();

    return (
      <View 
        style={styles.messageItemContainer} 
      >
        <TouchableOpacity onPress={this.onAvatarPress}>
          <Image 
            source={{ uri: user.avatarUrl }}
            style={styles.image} 
          />  
        </TouchableOpacity>
        <View style={styles.chatMessageContainer}>
          <Text style={styles.chatMessageItem}>
            {user.username} ({time}): {text}
          </Text>
        </View>
        <UserInfoModal 
          visible={modalVisible} 
          user={user} 
          setModalVisible={this.setModalVisible}  
        />
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default PublicMessage;