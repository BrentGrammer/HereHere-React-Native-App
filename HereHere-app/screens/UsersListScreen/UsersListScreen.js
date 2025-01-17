import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
//import { NavigationEvents } from 'react-navigation';
import UsersList from './UsersList/UsersList';
import componentStyles from './styles';

class UsersListScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    error: '',
    // user: {},
    // usersList: []
  };

  // componentDidFocus = (payload) => {
  //   const { usersList, user } = this.props;
  //   this.setState({ user, usersList });
  // };

          // <NavigationEvents
        //   onDidFocus={this.componentDidFocus}
        // />


  render() {
    const { usersList, placeSelected } = this.props;

    if (!placeSelected.placeName) {
      return (
        <View style={styles.noUsersFoundContainer}>
          <Text style={styles.noUsersFoundMessage}>(Select a Place on the Map to see which Users are there.)</Text>
        </View>
      );
    }
    
    return (  
      <View style={styles.container}>
        <Text style={styles.headerText}>Users at {placeSelected.placeName}</Text>
        <UsersList usersList={usersList} />
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

const mapStateToProps = state => ({
  usersList: state.chat.room.usersList,
  placeSelected: state.places.placeSelected,
});

export default connect(mapStateToProps)(UsersListScreen);


