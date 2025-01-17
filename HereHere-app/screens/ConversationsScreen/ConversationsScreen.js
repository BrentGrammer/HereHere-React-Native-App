import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View, Text, ScrollView, StyleSheet } from 'react-native';
import ConversationListItem from '../../components/ConversationListItem/ConversationListItem';
import { setConversationSelected, loadMessagesForConversation } from '../../store/actions/messages';
import { getConversations } from '../../store/actions/conversations';
import componentStyles from './styles';

class ConversationsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      error: '',
      loading: true
    };
  }

  componentDidMount() {
    this.getConversations();
  }

  getConversations = () => {
    const { user } = this.props;

    this.props.getConversations(user.userId, user.token)
      .then(conversations => {
        //@TODO: cache conversations in redux and just rely on updates from websocket to add from list?
        this.setState({ loading: false });
      })
      .catch(err => { 
        this.setState({ error: 'There was an error getting conversations.', loading: false }) 
      });
  };

  onConversationPressed = (conversation) => {
    const { navigation, setConversationSelected, loadMessagesForConversation, user } = this.props;
    
    loadMessagesForConversation(conversation._id, user.token)
      .then(() => {
        setConversationSelected(conversation);
        navigation.navigate('PrivateMessages');
      })
      .catch(err => {
        console.log('error priv msgs', err)
        this.setState({ error: 'There was an error getting messages.' });
      });
  };

  render() {
    const { user, conversations } = this.props;
    const { loading, error } = this.state;

    if (!user.userId) {
      return (
        <View style={[styles.container, styles.messageContainer]}>
          <Text style={styles.defaultText}>Please Login to View and Send Private Messages</Text>
        </View>
      );
    }

    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }

    if (loading) {
      return <ActivityIndicator size="large" />;
    }

    if (conversations.length < 1) {
      return <Text style={styles.defaultText}>No messages</Text>
    }

    return (
      <ScrollView>
        <View style={styles.conversationsListContainer}>
          {
            conversations
              .map(conversation => {
                const { _id, lastUserToSendMessage } = conversation;
            
                const prefix = lastUserToSendMessage === user.userId ? 'To' : 'From';
                return (
                  <ConversationListItem 
                    key={_id} 
                    conversation={conversation} 
                    prefix={prefix}
                    onConversationPressed={this.onConversationPressed}
                  />
                );
            })
        }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

const mapDispatchToProps = dispatch =>({
  getConversations: (userId, token) => dispatch(getConversations(userId, token)),
  setConversationSelected: (conversation) => dispatch(setConversationSelected(conversation)),
  loadMessagesForConversation: (messages, token) => dispatch(loadMessagesForConversation(messages, token))
});

const mapStateToProps = state => ({
  user: state.user,
  conversations: state.conversations
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsScreen);