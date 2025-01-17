import TextShadow from '../../constants/TextShadow';
import TextInputStyle from '../../constants/TextInputStyle';

const styles = {
  container: {
    flex: 1,
    padding: 20
  },
  buttonContainer: {
    marginBottom: 15
  },
  buttonContainer: {
    marginBottom: 15
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center'
  },
  label: {
    textAlign: 'center',
    ...TextShadow
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    ...TextInputStyle,
    marginBottom: 15
  }
};

export default styles;