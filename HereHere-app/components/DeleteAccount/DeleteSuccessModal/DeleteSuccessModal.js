import React, {Component} from 'react';
import {
  Button,
  Modal, 
  Text, 
  View, 
  StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';
import componentStyles from './styles';

class DeleteSuccessModal extends Component {

  onRequestClose = () => {
    this.props.navigation.navigate('Landing');
  };

  render() {
    const { visible } = this.props;
    
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={this.onRequestClose}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.successText}>
              Success! Your account and information has been removed.
            </Text>
            <View style={styles.okButtonContainer}>
              <Button
                title="OK"
                onPress={this.onRequestClose}
              />       
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default withNavigation(DeleteSuccessModal);