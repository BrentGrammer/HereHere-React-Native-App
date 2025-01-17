import TextShadow from '../../../constants/TextShadow';
const imageHeight = 60;
const imageWidth = 60;
const borderRadius = imageWidth / 2;

export default {
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 7,
  },
  image: {
    height: imageHeight,
    width: imageWidth,
    borderRadius,
    marginRight: 5
  },
  userInfoContainer: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row'
  },
  usernameText: {
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
    ...TextShadow
  },
  taglineText: {
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle:'italic',
    ...TextShadow
  }
}
