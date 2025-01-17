import TextShadow from '../../constants/TextShadow';
import TextInputStyle from '../../constants/TextInputStyle';

const styles = {
  appTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontStyle: 'italic',
    fontWeight: 'bold',
    ...TextShadow
  },
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 35,
    position: 'absolute',
    width: '100%'
  },
  bottomContainer: {
    flex: 1
  },
  label: {
    textAlign: 'center',
    ...TextShadow
  },
  instructionsTextContainer: {
    marginBottom: 15,
  },
  instructionsText: {
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center',
    ...TextShadow
  },
  topContainer: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    paddingBottom: 20,
    marginBottom: 15,
    elevation: 8888, // this worked to put suggestion list over the bottom view - may not be needed with latest SDK for Android, but doesn't hurt to leave in
    zIndex: 8888
  },
  textInput: {
    ...TextInputStyle,
    marginBottom: 15
  },
  buttonContainer: {
    marginBottom: 15
  }
};

export default styles;