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
  textInput: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 7,
    padding: 5,
    fontSize,
    width: 250
  },
  label: {
    fontSize,
    fontWeight: 'bold',
    ...TextShadow
  },
  labelValue: {
    fontStyle: 'italic',
    marginBottom: 7

  }
};

export default styles;