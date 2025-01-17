import React from 'react';
import { View, Image, StyleSheet, Text, Button, ActivityIndicator } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageToS3 } from '../../services/aws-s3'; 
import componentStyles from './styles';

import config from '../../config/config';

class UserAvatar extends React.Component {
  state = {
    error: '',
    loading: false
  };

  onChangeAvatar = async () => {
    this.setState({ loading: true, error: '' });
    const { userId, token } = this.props.user;

    if (!userId) {
      this.setState({ error: 'You must be logged in to change your pic.', loading: false });
      return;
    }

    let cameraRollPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const cameraRollStatus = cameraRollPermissions.permissions.cameraRoll.status;
    let { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status !== "granted" || cameraRollStatus !== "granted") {
      this.setState({ loading: false, error: 'Camera Permissions Denied.' });
      return;
    }
    
    let img = await ImagePicker.launchCameraAsync({ allowsEditing: true });
    if (img.cancelled === false) {  
      resizedImage = await ImageManipulator.manipulateAsync(
        img.uri,
        [{ resize: { width: 300, height: 300 } }]
      );

      const { userId } = this.props.user;
    
      const res = await fetch(`${config.SERVER_URL}/users/avatar/get-upload-url`, {
        method: 'POST',
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ userId }) //@TODO just use the filename on the phone to check if duplicate and use the phone image instead of pulling from db
      });
      const parsed = await res.json();

      if (parsed.success) {
        const { signedS3Url, filename } = parsed.data;
        
        uploadImageToS3(filename, resizedImage.uri, signedS3Url)
         .then(res => {
           console.log('uploaded to s3');
           // store link in database and store:
           this.props.updateAvatar(this.props.user, filename);
           this.setState({ loading: false });   
         })
         .catch(err => {
           console.log(err);
           this.setState({ loading: false, error: 'There was an error updating your photo. Please try again.' });
         });
      } else {
        this.setState({ loading: false, error: parsed.message });
        return;
      }
    } else {
      this.setState({ loading: false, error: 'Image not updated.'});
    }
  };

  onRemoveAvatar = () => {
    
    if (!this.props.user.userId) {
      return;
    }
    this.setState({ loading: true });
    this.props.removeAvatar()
    .then(res => {
      this.setState({ loading: false });
    })
    .catch(err => {
      this.setState({ error: 'Error removing Avatar Pic.' });
    });;
  };

  render() {
    const { error, loading } = this.state;
    const { avatarUrl } = this.props.user;

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {(!!error || !!this.props.error) && <Text style={styles.errorMessage}>{error}</Text>}
        <Text style={styles.label}>Avatar: </Text>
        <Image 
          source={{uri: avatarUrl}}
          style={styles.image} 
        />
        <View style={styles.button_container}>
          <Button 
            onPress={this.onChangeAvatar}
            title="Change Pic"
          /> 
        </View>
        <View style={styles.button_container}>
          <Button 
            onPress={this.onRemoveAvatar}
            title="Remove Pic"
            color="red"
          /> 
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create(componentStyles);

export default UserAvatar;