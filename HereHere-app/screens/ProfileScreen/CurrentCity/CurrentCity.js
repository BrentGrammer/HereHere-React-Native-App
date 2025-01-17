import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectCity from '../../LandingScreen/SelectCity/SelectCity';
import componentStyles from './styles';

class CurrentCity extends React.Component {

  onTextInputChange = (val) => {
    this.setState({ city: val });
  };

  handleChangeCity = () => {
    //@TODO call parent method to load messages for latest activity feed.
    //this.props.changeCity();
  };

  render() {
    const { city, error } = this.props;

    return (
      <View style={styles.container}>
        {!!error && <Text style={styles.errorMessage}>{error}</Text>}
        <Text style={styles.label}>Current City (Enter and Select City to Change): </Text>
        <Text style={[styles.label, styles.labelValue]}>{city}</Text>
        <SelectCity />
      </View> 
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default CurrentCity;



