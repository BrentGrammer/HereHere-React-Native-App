import React, {Component} from 'react';
import {
  Button,
  Image,
  Modal, 
  Text, 
  View, 
  StyleSheet} from 'react-native';
import componentStyles from './styles';

class UserInfoModal extends Component {

  closeModal = () => {
    this.props.setModalVisible(false);
  };

  onRequestClose = () => {
    this.closeModal();
  };

  render() {
    const { visible, user } = this.props;
    
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={this.onRequestClose}
        >
        <View style={styles.userInfoContainer}>
            <Button
              title="Close"
              onPress={this.closeModal}
            />       
              <Image 
                source={{uri: user.avatarUrl}}
                style={styles.image} 
              />
              <View style={styles.header}>
                <Text style={styles.usernameText}>{user.username}</Text>
                <Text style={styles.taglineText}>{user.tagline ? user.tagline : "(No Tagline Provided)"}</Text>     
              </View>
              <Text style={styles.sectionTitle}>Summary:</Text>
              <Text style={styles.summaryText}>{user.summary ? user.summary : "(No Summary Provided)"}</Text>
            </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default UserInfoModal;