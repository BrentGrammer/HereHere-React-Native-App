import React from 'react';
import {Button, View, Text, TextInput, StyleSheet, Keyboard } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import componentStyles from './styles';

const summaryLimit = 400;
const taglineLimit = 50;

class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tagline: '',
      summary: '',
      error: '',
      success: ''
    };
  }

  componentDidFocus = (payload) => {
    const { tagline, summary } = this.props.user;
    this.setState({ tagline, summary });
  };

  componentDidMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide = () => {
    this.captionTextInput.blur();
    this.summaryTextInput.blur();
  };

  onTaglineChange = (val) => {
    this.setState({ success: ''});
    if (val.length > taglineLimit) {
      this.setState({ error: 'Max 400 characters.'});
    } 
    if (val.length === taglineLimit - 1) {
      this.setState({ error: '' });
    }
    this.setState({ tagline: val });
  };

  onSummaryChange = (val) => {
    this.setState({ success: ''});
    if (val.length > summaryLimit) {
      this.setState({ error: 'Max 400 characters.'});
    } 
    if (val.length === summaryLimit - 1) {
      this.setState({ error: '' });
    }
    this.setState({ summary: val });
  };

  onSubmitUserInfo = () => {
    if (!this.props.user.userId) {
      this.setState({ error: 'Please log in to change Tagline and Summary.'});
      return;
    }
    const { tagline, summary } = this.state;
    this.props.changeTaglineAndSummary({ summary, tagline });
    this.setState({ error: '', success: 'Tagline and Summary updated!' });
  
  };

  render() {
    const { error, tagline, summary, success } = this.state;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={this.componentDidFocus}
        />
        <View style={styles.textInputContainer}>
          <Text style={styles.label}>
            Tagline (personal or business tagline):
          </Text>
          <TextInput
            ref={ref => this.captionTextInput = ref}
            defaultValue={tagline}
            style={styles.textInput}
            value={tagline}
            multiline={true}
            underlineColorAndroid="transparent"
            placeholder="Enter tagline..."
            placeholderTextColor="grey"
            maxLength={50}
            onChangeText={this.onTaglineChange}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.label}>
            Summary (personal info or business details):
          </Text>
          <TextInput
            ref={ref => this.summaryTextInput = ref}
            defaultValue={summary}
            style={[styles.textInput, styles.textArea]}
            value={summary}
            multiline={true}
            underlineColorAndroid="transparent"
            placeholder="Enter Summary..."
            placeholderTextColor="grey"
            numberOfLines={10}
            maxLength={400}
            onChangeText={this.onSummaryChange}
            maxHeight={150}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            title='Change Tagline/Summary'
            onPress={this.onSubmitUserInfo}  
          /> 
        </View>
        {!!success && <Text style={styles.successText}>{success}</Text>}
        {!!error && <Text style={styles.error}>{error}</Text>}
     </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default UserInfo;