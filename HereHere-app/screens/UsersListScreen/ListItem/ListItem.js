import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { storeUserSelected } from '../../../store/actions/userSelected';
import componentStyles from './styles';

//@TODO: Add touchable opacity to bring up popup with summary and larger pic

class ListItem extends React.Component {

  onListItemPressed = () => {
    const { storeUserSelected, navigation } = this.props;
    const { userId, username, avatarUrl, tagline, summary } = this.props.user;
    
    storeUserSelected({ userId, username, avatarUrl, tagline, summary });
    navigation.navigate("UserSelected");
  };

  render() {
    const { username, tagline, avatarUrl } = this.props.user;

    return (
      <TouchableOpacity style={styles.container} onPress={this.onListItemPressed}>
        <Image 
          source={{ uri: avatarUrl }}
          style={styles.image} 
        />  
        <View style={styles.userInfoContainer}>
          <Text style={styles.usernameText}>
            {username}: {tagline.length > 0 ? tagline : '(No Tagline Provided)'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

const mapDispatchToProps = dispatch => ({
  storeUserSelected: (userSelected) => dispatch(storeUserSelected(userSelected))
});

const Connected = connect(null, mapDispatchToProps)(ListItem);

export default withNavigation(Connected);


