import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
//import { NavigationEvents } from 'react-navigation';
const uuidv4 = require('uuid/v4');
import ListItem from '../ListItem/ListItem';
import componentStyles from './styles';

class UsersList extends React.Component {

  state = {
    error: ''
  };

  render() {
    const { usersList } = this.props;

    return (
       <ScrollView>
         <View style={styles.container}>
          {
            usersList.length > 0 
              && usersList.map(user => {
                  return (<ListItem key={uuidv4()} user={user} />);
                })
          }
         </View>
       </ScrollView>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default UsersList;


