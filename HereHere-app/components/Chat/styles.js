import TextShadow from '../../constants/TextShadow';

export default {
  container: {
    flex: 1, 
    padding: 5 
  },
  chatInputContainer: {
    flexDirection: 'row' 
  },
  noMessagesText: {
    flex: 1,
    textAlign: 'center',
    fontStyle: 'italic',
    ...TextShadow
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
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
