import TextShadow from '../../../constants/TextShadow';

export default {
  buttonContainer: {
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  error: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'red',
    marginTop: 5,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    ...TextShadow
  },
  successText: {
    color: 'blue',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 10,
    ...TextShadow
  },
  textArea: {
    textAlignVertical: "top"
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'gray',
    padding: 10,
    maxWidth: '100%',
    fontSize: 16
  },
  textInputContainer: {
    marginBottom: 10,
    width: '100%'
  }
};