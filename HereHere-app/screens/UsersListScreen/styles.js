import TextShadow from '../../constants/TextShadow';

export default {
  container: {
    flex: 1
  },
  headerText: {
      borderBottomWidth: 2,
      borderBottomColor: 'red',
      textAlign: 'center',
      fontStyle: 'italic',
      fontWeight: 'bold',
      fontSize: 18,
      ...TextShadow
  },
  noUsersFoundContainer: {
    flex: 1,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noUsersFoundMessage: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 18,
    ...TextShadow
  }
}