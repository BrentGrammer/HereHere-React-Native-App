import { createStackNavigator } from 'react-navigation';
import LandingScreen from '../screens/LandingScreen/LandingScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignupScreen from '../screens/SignupScreen/SignupScreen';

export default createStackNavigator({
  Landing: LandingScreen,
  Login: LoginScreen,
  Signup: SignupScreen
});