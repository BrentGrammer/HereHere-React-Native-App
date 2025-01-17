import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import config from "../../config/config";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Privacy",
  };

  openWebLink = (link) => {
    WebBrowser.openBrowserAsync(link);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.linkContainer}>
          <Text
            onPress={() => this.openWebLink(`${config.SERVER_URL}/privacy`)}
            style={styles.link}
          >
            LINK TO PRIVACY POLICY
          </Text>
        </View>
        <View style={styles.disclaimersContainer}>
          <Text style={styles.disclaimersHeader}>
            IMPORTANT PRIVACY INFORMATION:
          </Text>
          <Text>
            This app records public chat messages you send which include a place
            location and your username (handle) and the time of day the message
            was sent. Private Chat Messages are also now recorded in the
            database to persist and view on revisiting the app - Do not disclose
            or include any sensitive information you do not want stored online
            in the database for the application. You are responsible for any
            information you disclose and include in the chat message in addition
            to that data and should use the app with due caution and at your
            discretion and own risk. If other users enter the chat for the place
            you posted, they will be able to see what time you posted in
            addition to the location of the place (your actual location on your
            device is not shared, only the place chat room where you posted the
            chat message.) Please be aware of this and use the app responsibly.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff",
  },
  disclaimersContainer: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    marginBottom: 15,
    padding: 5,
  },
  disclaimersHeader: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 20,
    textAlign: "center",
  },
  link: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
  },
  linkContainer: {
    borderColor: "grey",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    padding: 5,
  },
  myLink: {
    fontSize: 18,
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: "grey",
    textShadowRadius: 2,
  },
  myLinkContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 3,
  },
});
