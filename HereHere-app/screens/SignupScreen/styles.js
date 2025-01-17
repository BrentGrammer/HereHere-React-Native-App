import TextShadow from '../../constants/TextShadow';
import TextInputStyle from '../../constants/TextInputStyle';

const styles = {
  buttonContainer: {
    marginBottom: 15
  },
  container: {
    flex: 1,
    padding: 20
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 7
  },
  label: {
    marginBottom: 2,
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
  },

};

export default styles;