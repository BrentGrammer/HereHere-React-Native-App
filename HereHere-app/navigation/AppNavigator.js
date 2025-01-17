import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LandingNavigator from "./LandingNavigator";
import MainNavigator from "./MainNavigator";

const AppNavigator = createSwitchNavigator(
  {
    // authflow for react-native https://reactnavigation.org/docs/en/auth-flow.html
    Landing: LandingNavigator,
    Main: { screen: MainNavigator },
  },
  { initialRouteName: "Landing" }
);

// As of RN v3 you need to wrap your main navigator in an appcontainer
export default createAppContainer(AppNavigator);
