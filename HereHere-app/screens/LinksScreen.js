import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import config from '../config/config';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  openWebLink = (link) => {
    WebBrowser.openBrowserAsync(link);
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.linkContainer, styles.myLinkContainer]}>
          <Text 
            onPress={() => this.openWebLink('https://brentmarquez.com')}
            style={[styles.link, styles.myLink]}
          >
            Brent Marquez | Web and Application Development: https://brentmarquez.com
          </Text>
        </View>      
        <View style={styles.linkContainer}>
          <Text 
            onPress={() => this.openWebLink(`${config.SERVER_URL}/privacy`)}
            style={styles.link}
          >
            Link to Privacy Policy
          </Text>   
        </View>
        <View style={styles.linkContainer}>
          <Text 
            onPress={() => this.openWebLink('https://www.freepik.com/')}
            style={styles.link}
          >
            App Icon made by Freepik (https://www.freepik.com/) from (https://www.flaticon.com/) is licensed by (http://creativecommons.org/licenses/by/3.0/) CC 3.0 BY
          </Text>   
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff',
  },
  disclaimersContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginBottom: 15,
    padding: 5
  },
  disclaimersHeader: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 20,
    textAlign: 'center'
  },
  link: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  linkContainer: {
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    padding: 5
  },
  myLink: {
    fontSize: 18,
    textShadowOffset: { width: 1, height: 1},
    textShadowColor: 'grey',
    textShadowRadius: 2,
  },
  myLinkContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 3
  }
});
