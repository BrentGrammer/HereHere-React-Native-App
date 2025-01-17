import TextShadow from '../../constants/TextShadow';

export default {
  container: {
    flex: 1, 
    padding: 5,
  },
  chatInputContainer: {
    flexDirection: 'row' 
  },
  chatHeader: {
    textAlign: 'center',
    fontStyle: 'italic',
    ...TextShadow
  },
  chatHeaderContainer: {
    alignItems: 'center',
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    flexDirection: 'row',
    marginBottom: 5
  },
  chatMessageContainer: {
    flex: 1,
    marginLeft: 5
  },
  chatMessageItem: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderTopColor: 'gray'
  },
  chatTextInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 7,
    paddingRight: 40,
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 5
  },
  error: {
    color: 'red',
    fontStyle: 'italic',
    textAlign: 'center'
  },
  latestActivityContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  messageItemContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  placeholderHeader: {
    fontSize: 26,
    fontStyle: 'italic',
    ...TextShadow,
    textAlign: 'center'
  },
  placeholderMessage: {
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center'
  },
  sendMessageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    right: 0, 
    top: 0,
    height: 40,
    width: 40
  },
};
