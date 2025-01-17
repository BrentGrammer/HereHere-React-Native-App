import TextShadow from '../../constants/TextShadow';

export default {
  container: {
    flex: 1
  },
  conversationsListContainer: {
    flex: 1
  },
  headerText: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
    ...TextShadow
  },
  defaultText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    ...TextShadow
  },
  error: {
    color: 'red'
  },
  messageContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
}