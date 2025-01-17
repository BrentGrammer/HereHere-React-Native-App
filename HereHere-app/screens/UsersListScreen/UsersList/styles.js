import TextShadow from '../../../constants/TextShadow';

export default {
  container: {
    flex: 1,
    padding: 7
  },
  noUsersFoundContainer: {
    flex: 1,
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