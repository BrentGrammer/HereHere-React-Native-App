import React from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import componentStyles from './styles';

class ChangeHandle extends React.Component {
  state = {
    handle: ''
  };

  onTextInputChange = (val) => {
    this.setState({ handle: val });
  };

  changeHandleName = () => {
    this.props.changeHandleName(this.state.handle);
  };

  render() {
    const { username } = this.props.user;
    const { error } = this.props;

    return (
      <View style={styles.container}>
        {!!error && <Text style={styles.errorMessage}>{error}</Text>}
        <Text style={styles.label}>Current Handle Name: </Text>
        <Text style={[styles.label, styles.labelValue]}>{username}</Text>
        <TextInput
          style={styles.textInput} 
          placeholder="Enter new name"
          defaultValue={username}
          onChangeText={this.onTextInputChange}
          underlineColorAndroid="transparent" 
          maxLength={50}
        />
        <View style={styles.button_container}>
          <Button 
            title="Change Name" 
            onPress={this.changeHandleName} 
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default ChangeHandle;

