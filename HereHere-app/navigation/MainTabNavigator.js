import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import MainScreen from '../screens/MainScreen';
import UsersListScreen from '../screens/UsersListScreen/UsersListScreen';
import UserSelectedScreen from '../screens/UserSelectedScreen/UserSelectedScreen';
import ConversationsScreen from '../screens/ConversationsScreen/ConversationsScreen';
import PrivateMessagesScreen from '../screens/PrivateMessagesScreen/PrivateMessagesScreen';

const MainStack = createStackNavigator({
  Main: MainScreen
});

MainStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-map${focused ? '' : '-outline'}`
          : 'md-map'
      }
    />
  ),
};

const UsersStack = createStackNavigator({
  Users: UsersListScreen,
  UserSelected: UserSelectedScreen
});

UsersStack.navigationOptions = {
  tabBarLabel: 'Users',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  ),
};

const ConversationsStack = createStackNavigator({
  Conversations: ConversationsScreen,
  PrivateMessages: PrivateMessagesScreen
});

ConversationsStack.navigationOptions = {
  tabBarLabel: 'Messages',
  headerMode: "none",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-text' : 'md-text'}
    />
  )
};

export default createBottomTabNavigator({
  MainStack,
  UsersStack,
  ConversationsStack
});


