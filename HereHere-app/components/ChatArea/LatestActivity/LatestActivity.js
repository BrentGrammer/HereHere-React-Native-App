import React from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import MessagesList from "../../MessagesList/MessagesList";
import componentStyles from "./styles";
import { getLatestActivity } from "../../../store/actions/messages";
class LatestActivity extends React.Component {
  state = {
    initiallyMounted: true,
    latestMessages: [],
    loading: false,
    error: "",
  };

  componentDidMount() {
    this.getLatestActivityMessages(this.props.city).then((res) => {
      this.setState({ initiallyMounted: false });
    });
  }

  componentDidFocus = (payload) => {
    const { initiallyMounted } = this.state;

    if (initiallyMounted === false) {
      this.getLatestActivityMessages(this.props.city);
    }
  };

  getLatestActivityMessages = (city = "World") => {
    // if city is "World", all messages one day ago returned
    this.setState({ loading: true, error: "" });
    //@TODO convert times to local timezone
    // Send local time zone to server and convert on server as well
    return getLatestActivity(city)
      .then((res) => {
        this.setState({ latestMessages: res.data, loading: false });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: "Connection Error getting activity.",
        });
        console.log("error getting latest activity", err);
      });
  };

  render() {
    const { city } = this.props;
    const { latestMessages, error, loading } = this.state;

    if (loading) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={this.componentDidFocus} />
        {!!error && <Text>{error}</Text>}
        {latestMessages && latestMessages.length > 0 ? (
          <MessagesList messages={latestMessages} city={city} />
        ) : (
          <Text style={styles.noActivityMessage}>(No Activity)</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default LatestActivity;
