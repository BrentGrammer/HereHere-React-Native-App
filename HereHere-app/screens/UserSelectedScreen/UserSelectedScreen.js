import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Image, 
  Text, 
  View, 
  StyleSheet } from 'react-native';
import SendMessageModal from '../../components/SendMessageModal/SendMessageModal';
import componentStyles from './styles';

class UserSelectedScreen extends Component {
  static navigationOptions = {
    title: 'User Details',
    headerTruncatedBackTitle: 'Back', // <-- set back button text
  }

  state = {
    modalVisible: false
  };

  openSendMessageModal = () => {
    this.setState({ modalVisible: true });
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { userSelected, user } = this.props;
    const { modalVisible } = this.state;
    
    return (
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Image 
            source={{uri: userSelected.avatarUrl}}
            style={styles.image} 
          />
          <View style={styles.header}>
            <Text style={styles.usernameText}>{userSelected.username}</Text>
            <Text style={styles.taglineText}>{userSelected.tagline ? userSelected.tagline : "(No Tagline Provided)"}</Text>     
          </View>
          <Text style={styles.sectionTitle}>Summary:</Text>
          <Text style={styles.summaryText}>{userSelected.summary ? userSelected.summary : "(No Summary Provided)"}</Text>
          {user.userId !== userSelected.userId 
            && (
                <View style={styles.sendMessageButtonContainer}>
                  <Button 
                    title="Send Message"
                    onPress={this.openSendMessageModal}
                  />
                </View>
               )} 
          <SendMessageModal 
            visible={modalVisible} 
            setModalVisible={this.setModalVisible} 
            userSelected={userSelected}
            user={user}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

const mapStateToProps = state => ({
  user: state.user,
  userSelected: state.userSelected
});

export default connect(mapStateToProps)(UserSelectedScreen);