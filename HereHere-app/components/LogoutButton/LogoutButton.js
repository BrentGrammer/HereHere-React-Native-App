import React from 'react';
import { Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import componentStyles from './styles';
import { emitRemoveSocketIdFromServerList } from '../../services/socketIO';

const LogoutButton = props => {

  const onPress = () => {
    const { logoutUser, navigation, token } = props;

    Alert.alert(
      'Log out',
      'Do you want to logout?',
      [
        {text: 'Cancel', onPress: () => {return null}},
        {text: 'Confirm', onPress: () => {
          emitRemoveSocketIdFromServerList();
          logoutUser(token)
            .then(res => {
              navigation.navigate('Landing');
            })
            .catch(err => {
              //@TODO: Display error to user
              console.log('err logging out')
            });
   
        }},
      ],
      { cancelable: false }
    ); 
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.logoutButton}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(componentStyles);

export default withNavigation(LogoutButton);