import React from 'react';
import { connect } from 'react-redux';
import { 
  ActivityIndicator,
  Text, 
  TextInput, 
  View, 
  Button, 
  StyleSheet 
} from 'react-native';

import { signupUser } from '../../store/actions/user'; 
import { storeMapRegion } from '../../store/actions/map';
import { emailValidator } from '../../util/validation';
import componentStyles from './styles';
import { emitSendUserIdToServerToUpdateSocketIdsList } from '../../services/socketIO';

class SignupScreen extends React.Component {
  static navigationOptions = {
    title: 'Signup',
  };

  state = {
    username: '',
    password: '',
    email: '',
    error: '',
    loading: false
  };

  onUsernameInputChange = (val) => {
    this.setState({ username: val });
  };

  onPasswordInputChange = (val) => {
    this.setState({ password: val });
  };

  onEmailInputChange = (val) => {
    this.setState({ email: val });
  };
  
  onCancel = () => {
    this.props.navigation.navigate("Landing");
  };

  onSubmit = () => {
    this.setState({ error: '', loading: true });
    const { signupUser } = this.props;
    let { username, email, password } = this.state;
    const { tagline, summary, city } = this.props.user
  
    username = username.trim();
    email = email.trim();
    const isValid = emailValidator(email);
    if (!isValid) {   
      this.setState({ loading: false, error: 'Invalid Email' });
      return;
    }

    signupUser({ username, email, password, tagline, summary, city })
      .then(success => {
        this.setState({ loading: false }, () => {
          if (success) {
            const { userId } = this.props.user;
            emitSendUserIdToServerToUpdateSocketIdsList(userId);
            this.props.navigation.navigate("Main");
            return;
          } else {
            throw new Error('There was an error creating your account.');
          }   
        });
      })
      .catch(error => {
        this.setState({ loading: false, error: error.message || 'There was an error creating the account. Please try again.' });
        return;
      });
  };

  render() {
    const { username, email, password, error, loading } = this.state;

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {!!error && <Text style={styles.errorMessage}>{error}</Text>}
        <Text style={styles.label}>CREATE USERNAME:</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Enter a username..."
          value={username}
          onChangeText={this.onUsernameInputChange}
        />
        <Text style={styles.label}>ENTER EMAIL:</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Enter Email..."
          value={email}
          onChangeText={this.onEmailInputChange}
          autoCapitalize="none"
        />  
        <Text style={styles.label}>CREATE PASSWORD:</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Enter a Password..."
          value={password}
          onChangeText={this.onPasswordInputChange}
          autoCapitalize="none"
        />    
        <View style={styles.buttonContainer}>
          <Button 
            onPress={this.onSubmit}
            title="Create Account"
          />
        </View>
        <View>
          <Button 
            onPress={this.onCancel}
            title="Cancel"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  storeMapRegion: (region) => dispatch(storeMapRegion(region)),
  signupUser: (user) => dispatch(signupUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);