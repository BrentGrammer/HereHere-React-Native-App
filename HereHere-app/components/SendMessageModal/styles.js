import TextShadow from '../../constants/TextShadow';
import TextInputStyle from '../../constants/TextInputStyle';
import { bold } from 'ansi-colors';

export default {
  container: {
    marginTop: 22
  },
  contentContainer: {
    padding: 10,
    marginTop: 22,
    flex: 1
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7,
    marginTop: 15,
    ...TextShadow
  },
  messageTextInput: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 7,
    padding: 10,
    textAlignVertical: "top"
  },
  successText: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginTop: 20,
    ...TextShadow,
    textAlign: 'center'
  }
}