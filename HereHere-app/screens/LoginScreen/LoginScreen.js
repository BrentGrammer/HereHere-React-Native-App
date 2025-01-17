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
import { storeUserInfo, loginUser } from '../../store/actions/user'; 
import { emailValidator } from '../../util/validation';
import componentStyles from './styles';
import { emitSendUserIdToServerToUpdateSocketIdsList } from '../../services/socketIO';

export class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  state = {
    email: '',
    password: '',
    error: ''
  };

  onEmailInputChange = (val) => {
    this.setState({ email: val });
  };

  onPasswordInputChange = (val) => {
    this.setState({ password: val });
  };

  onCancel = () => {
    this.props.navigation.navigate("Landing");
  };

  switchToSignupScreen = () => {
    this.props.navigation.navigate("Signup");
  };

  onSubmit = () => {
    this.setState({ loading: true, error: '' });
    const { loginUser } = this.props;
    let { email, password } = this.state;
    
    email = email.trim();
    const isValid = emailValidator(email);
    if (!isValid) {   
      this.setState({ loading: false, error: 'Invalid Email' });
      return;
    }
   
    loginUser({ email, password })
      .then(user => {
        emitSendUserIdToServerToUpdateSocketIdsList(user.userId);
      })
      .then(res => {
        this.setState({ loading: false }, () => {
          this.props.navigation.navigate("Main");
        });
      })
      .catch(err => {
        this.setState({ loading: false, error: 'Error logging in. Please try again.' });
      });
  };

  render() {
    const { email, password, error, loading } = this.state;

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
        <Text style={styles.label}>EMAIL:</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Enter email..."
          value={email}
          onChangeText={this.onEmailInputChange}
          autoCapitalize="none"
        />
        <Text style={styles.label}>PASSWORD:</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Enter Password..."
          value={password}
          onChangeText={this.onPasswordInputChange}
          autoCapitalize="none"
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.onSubmit}
            title="Login"
          />  
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            onPress={this.onCancel}
            title="Cancel"
            color="red"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            onPress={this.switchToSignupScreen}
            title="No Account? Signup Here!"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

const mapDispatchToProps = dispatch => ({
  storeUserInfo: (userInfo) => dispatch(storeUserInfo(userInfo)),
  loginUser: (user) => dispatch(loginUser(user))
});

export default connect(null, mapDispatchToProps)(LoginScreen);