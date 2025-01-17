import React from 'react';
import { View, Platform, ScrollView, StyleSheet } from 'react-native';
import { DrawerItems, SafeAreaView, NavigationActions } from 'react-navigation';
import LoginLogout from '../../components/LoginLogout/LoginLogout';
import componentStyles from './styles';

const CustomView = Platform.OS === 'ios' ? SafeAreaView : View;

class Drawer extends React.Component {

  onItemPress = (navigation) => {
    if ( navigation.focused == false ){
      const navigateAction = NavigationActions.navigate({
          routeName: navigation.route.routeName,
      });
      this.props.navigation.dispatch(navigateAction);
    }
  };

  render() {
    return (
      <CustomView style={styles.container}>
        <ScrollView>
          <LoginLogout />
          <DrawerItems 
            {...this.props} 
            onItemPress={(navigation) => { this.onItemPress(navigation); }}
            labelStyle={styles.drawerMenuItem}
        />       
        </ScrollView>
      </CustomView>
    )
  }
};

const styles = StyleSheet.create(componentStyles);

export default Drawer;