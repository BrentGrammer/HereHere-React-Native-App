import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import ChangeHandle from './ChangeHandle/ChangeHandle';
import CurrentCity from './CurrentCity/CurrentCity';
import UserInfo from './UserInfo/UserInfo';
import { 
  storeUserInfo, 
  updateAvatar, 
  removeAvatar, 
  updateUserInDatabase
} from '../../store/actions/user';
import { storePlaceSelected } from '../../store/actions/places';
import { unsetPublicMessages } from '../../store/actions/messages';
import { sliceAvatarFilename } from '../../util/helpers';
import APP_CONSTANTS from '../../constants/App';
import componentStyles from './styles';
import DeleteAccount from '../../components/DeleteAccount/DeleteAccount';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile'
  };

  state = {
    errors: {
      avatar: '',
      handle: '',
      city: ''
    } 
  };

  changeHandleName = (handle) => {
    this.setState({ errors: { handle: '' }});
    const { user, storeUserInfo } = this.props;

    if (handle.length < 1 || handle.length > 50) {
      this.setState({ errors: { handle: 'Entered Handle is the same or length is invalid.' }})
      return;
    }
    if (user.userId) {
      this.updateUserInDatabase({ username: handle });
    }
    storeUserInfo({ username: handle });
  };

  changeTaglineAndSummary = ({ summary, tagline }) => {
    this.props.storeUserInfo({ summary, tagline });
    this.updateUserInDatabase({ summary, tagline })
      .catch(err => {
        console.log('error updating user info');
      });  
  };

  changeCity = (city) => {
    const { 
      user, 
      storeUserInfo, 
      storePlaceSelected, 
      unsetPublicMessages
    } = this.props;
    //this.setState({ errors: { city: '' } });
    if (user.userId) {
      this.updateUserInDatabase({ city });
    }
    storeUserInfo({ city });
    storePlaceSelected(null);
    unsetPublicMessages();
    //@TODO load latest activity messages
  };

  updateAvatar = (user, filename) => {
    this.props.updateAvatar(user, filename)
      .then(res => {
        console.log('updated avatar')
      })
      .catch(err => {
        console.log('There was an error updating avatar', err)
        this.setState(prevState => ({ 
          errors: { ...prevState.errors, avatar: 'Error updating Avatar Pic.' } 
        }));
      });
  };

  updateUserInDatabase = (updates) => {
    const { userId, token } = this.props.user;
    return this.props.updateUserInDatabase(userId, updates, token);
  };

  removeAvatar = () => {
    const { user } = this.props;
    const { userId, avatarUrl, token } = user;
    return this.props.removeAvatar(userId, avatarUrl, token)
  };

  render() {
    const { user } = this.props;

    return (
       <ScrollView>
        <View style={styles.container}>
          <View style={styles.changeHandleContainer}>
            <ChangeHandle 
              user={this.props.user} 
              changeHandleName={this.changeHandleName} 
              updateUserInDatabase={this.updateUserInDatabase}
              error={this.state.errors.handle}
            />
          </View>
          <View>
            <CurrentCity 
              user={this.props.user}
              changeCity={this.changeCity}
              error={this.state.errors.city}
              city={this.props.user.city}
            />      
          </View>
          <UserAvatar 
            updateAvatar={this.updateAvatar} 
            removeAvatar={this.removeAvatar}
            user={user}
            error={this.state.errors.avatar}
          />
          <View style={styles.userInfoContainer}>
            <UserInfo 
              changeTaglineAndSummary={this.changeTaglineAndSummary} 
              user={user} 
            />
          </View>
          
          <DeleteAccount 
            token={user.token} 
            removeAvatar={this.removeAvatar} 
          />
        </View>
       </ScrollView>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  storePlaceSelected: (place) => dispatch(storePlaceSelected(place)),
  storeUserInfo: (userInfo) => dispatch(storeUserInfo(userInfo)),
  updateAvatar: (userId, filename) => dispatch(updateAvatar(userId, filename)),
  removeAvatar: (userId, filename, token) => dispatch(removeAvatar(userId, filename, token)),
  unsetPublicMessages: () => dispatch(unsetPublicMessages()),
  updateUserInDatabase: (userId, updates, token) => dispatch(updateUserInDatabase(userId, updates, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

