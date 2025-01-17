import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Message from '../Message/Message';
import LatestActivityItem from '../ChatArea/LatestActivity/LatestActivityItem/LatestActivityItem';
import componentStyles from './styles';
 
class MessagesList extends React.PureComponent {

  constructor(props) {
    super(props);
    this.scrollView = this.refs.scrollView;

    this.state = {
      scrollY: 0,
      layoutHeight: 0,
      previousContentHeight: 0,
      initialLoad: true
    };
  }

  componentDidMount() {
    this.scrollToEnd();   
  }

  scrollToEnd = () => {
    setTimeout(() => {
      if (this.scrollView !== null) {
        this.scrollView.scrollToEnd({ animated: false });
        return;
      } else {
        this.scrollToEnd();
      }
    }, 500);
  };

  storeScrollYandLayoutHeightOnDrag = (e) => {
    const scrollY = e.nativeEvent.contentOffset.y;
    const layoutHeight = e.nativeEvent.layoutMeasurement.height;
    this.setState({ scrollY, layoutHeight });
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    const { scrollY, layoutHeight, previousContentHeight } = this.state;

    if (this.state.initialLoad) {
      this.setState({ previousContentHeight, initialLoad: false });
      return;
    }
    
    compensateForDecimalsOffset = 1;
    const bottomOfListScrollYPosition = (previousContentHeight - layoutHeight) - compensateForDecimalsOffset;

    if (scrollY >= bottomOfListScrollYPosition) {
      this.scrollView.scrollToEnd({ animated: false });

      const newScrollY = (contentHeight - layoutHeight) + compensateForDecimalsOffset;
      this.setState({ previousContentHeight: contentHeight, scrollY: newScrollY });
    } else {
      return;
    };
  };

  render() {
    const { messages } = this.props;

    if (!messages) {
      return <Text>Loading</Text>
    }

    return (
      <View style={styles.container}>
        <ScrollView
          ref={(ref) => { this.scrollView = ref }}
          onMomentumScrollEnd={this.storeScrollYandLayoutHeightOnDrag}
          onContentSizeChange={this.onContentSizeChange}
        >     
          {messages.map((message, index) => {
            if (this.props.city) {
              return <LatestActivityItem key={index + 'latestActivity'} message={message} />;
            }

            return <Message key={index + 'message'} message={message} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create(componentStyles);

export default MessagesList;