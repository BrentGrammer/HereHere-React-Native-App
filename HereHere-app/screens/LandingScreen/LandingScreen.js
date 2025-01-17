import React from 'react';
import { connect } from 'react-redux';
import { 
  Text, 
  TextInput, 
  View, 
  Button, 
  StyleSheet 
} from 'react-native';
import SelectCity from './SelectCity/SelectCity';
import { storeUserInfo } from '../../store/actions/user'; 
import { storeMapRegion } from '../../store/actions/map';
import componentStyles from './styles';

class LandingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    username: '',
    city: {
      value: '',
      coords: null
    },
    suggestions: []
  };

  onUsernameInputChange = (val) => {
    this.setState({ username: val });
  };

  switchToSignupScreen = () => {
    this.props.navigation.navigate("Signup");
  };

  switchToLoginScreen = () => {
    this.props.navigation.navigate("Login");
  };

  startAppWithoutLogin = () => {
    const { storeUserInfo } = this.props;
    const { username } = this.state;
    // set defaults if user doesn't enter (will be "Patron")
    let userInfo = {};

    if (username.length > 0) {
      userInfo = { username };
    }
    storeUserInfo(userInfo); 
    //storeMapRegion(city.coords);
    
    this.props.navigation.navigate("Main");
  };

  render() {
    const { username } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.appTitle}>HereHere!</Text>
          <View style={styles.instructionsTextContainer}>
            <Text style={styles.instructionsText}>Try the app without logging in.</Text>
            <Text style={styles.instructionsText}>(features limited):</Text>
          </View>    
          <Text style={styles.label}>USERNAME:</Text>
          <TextInput 
            style={styles.textInput}
            placeholder="Enter a username..."
            value={username}
            onChangeText={this.onUsernameInputChange}
          />
          <Text style={styles.label}>ENTER A CITY (Optional):</Text>
          <SelectCity />
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.startAppWithoutLogin}
              title="Continue Without Logging in"
            />
          </View>
        </View>
        <Text  style={[styles.instructionsText, styles.instructionsTextContainer]}>Login to save profile information:</Text>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.switchToLoginScreen}
              title="Login"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button 
              onPress={this.switchToSignupScreen}
              title="Signup/Create Account"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

const mapDispatchToProps = dispatch => ({
  storeUserInfo: (userInfo) => dispatch(storeUserInfo(userInfo)),
  storeMapRegion: (region) => dispatch(storeMapRegion(region))
});

export default connect(null, mapDispatchToProps)(LandingScreen);