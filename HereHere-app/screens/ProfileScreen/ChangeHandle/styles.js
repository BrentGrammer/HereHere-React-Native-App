import TextShadow from '../../../constants/TextShadow';

const fontSize = 16;

const styles = {
  button_container: {
    width: 250
  },
  container: {
    marginBottom: 10,
    alignItems: 'center'
  },
  errorMessage: {
    color: 'red'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    ...TextShadow
  },
  labelValue: {
    fontStyle: 'italic'
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 7,
    padding: 5,
    fontSize,
    width: 250
  }
};

export default styles;