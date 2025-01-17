import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PrivateMessage from './PrivateMessage';
import PublicMessage from './PublicMessage';

// listItem={props => { return (<LatestActivityItem {...props} city={city} />)}}
class Message extends React.Component {

  renderMessage = () => {
    const { 
      message, 
      user, 
      conversationSelected
    } = this.props;

    if (message.to) {
      return <PrivateMessage 
                message={message} 
                user={user} 
                conversationSelected={conversationSelected} 
              />;
    } else {
      return <PublicMessage message={message} />;
    }
  }

  render() { 
    return (
      <View>
        {this.renderMessage()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  conversationSelected: state.messages.conversationSelected
});

export default connect(mapStateToProps)(Message);