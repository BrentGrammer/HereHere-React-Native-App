import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Alert, StyleSheet, Button, View, Text } from 'react-native';
import DeleteSuccessModal from './DeleteSuccessModal/DeleteSuccessModal';
import { deleteUserAccount } from '../../store/actions/user';
import { emitRemoveSocketIdFromServerList } from '../../services/socketIO';
import componentStyles from './styles';

class DeleteAccount extends React.Component {

  state = {
    showModal: false,
    error: '',
    loading: false
  };

  deleteAccount = () => {
    const { token, removeAvatar, deleteUserAccount } = this.props;
    this.setState({ error: '', loading: true });

    return removeAvatar()
      .then(res => {
        return deleteUserAccount(token);
      })
      .then(res => {
        this.setState({ loading: false, showModal: true });
      })
      .catch(err => {
        console.log('Error deleteing account', err);
        this.setState({ 
          error: 'Error: Your account was not able to be deleted.',
          loading: false
        });
      });
  };

  onDeleteAccountPressed = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure? All records will be deleted!',
      [
        {text: 'Cancel', onPress: () => {return null}},
        {text: 'Delete Account', onPress: () => {
          emitRemoveSocketIdFromServerList();
          this.deleteAccount();
        }},
      ],
      { cancelable: false }
    ); 
  };
 
  render() {
    const { error, showModal, loading } = this.state;
    const userLoggedIn = this.props.token ? true : false; 


    if (loading) {
      return <ActivityIndicator size="large" />
    }

    return (
      <View>
       {!!error && <Text style={styles.errorText}>{error}</Text>}
       {userLoggedIn && 
        <Button 
          onPress={this.onDeleteAccountPressed} 
          title="Delete Account" 
          style={styles.deleteButton}
          color="red"
        />}

        <DeleteSuccessModal visible={showModal} />
      </View>
    );
  }
};

const styles = StyleSheet.create(componentStyles);

const mapDispatchToProps = dispatch => ({
  deleteUserAccount: (token) => dispatch(deleteUserAccount(token))
});

export default connect(null, mapDispatchToProps)(DeleteAccount);