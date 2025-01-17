import React from 'react';
import { connect } from 'react-redux';
import LoginButton from '../LoginButton/LoginButton';
import LogoutButton from '../LogoutButton/LogoutButton';
import { logoutUser } from '../../store/actions/user';

class LoginLogout extends React.Component {
  
  render() {
    const { userId, token } = this.props.user;

    if (userId) {
        return (
          <LogoutButton 
            logoutUser={this.props.logoutUser} 
            token={token} 
          />
        );
    } 
    return <LoginButton />
  }
}

const mapDispatchToProps = dispatch => ({
  logoutUser: (token) => dispatch(logoutUser(token))
});

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginLogout);