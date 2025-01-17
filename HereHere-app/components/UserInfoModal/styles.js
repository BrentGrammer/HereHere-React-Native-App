import TextShadow from '../../constants/TextShadow';

const imageHeight = 150;
const imageWidth = 150;
const borderRadius = imageWidth / 2;

export default {
  container: {
    marginTop: 22
  },
  contentContainer: {
    padding: 10,
    marginTop: 22,
    flex: 1
  },
  header: {
    alignItems: 'center',
    marginBottom: 20
  },
  image: {
    height: imageHeight,
    width: imageWidth,
    borderRadius,
    marginTop: 10,
    marginBottom: 5
  },
  summaryText: {
    fontSize: 16
  },
  taglineText: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 16,
    ...TextShadow
  },
  userInfoContainer: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: 'gray',
    padding: 10,
    alignItems: 'center'
  },
  usernameText: {
    fontSize: 20,
    fontWeight: 'bold',
    ...TextShadow
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    ...TextShadow
  },
  sendMessageButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
}