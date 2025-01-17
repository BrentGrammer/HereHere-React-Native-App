import TextShadow from '../../constants/TextShadow';
const imageHeight = 60;
const imageWidth = 60;
const borderRadius = imageWidth / 2;

export default {
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  error: {
    color: 'red'
  },
  image: {
    height: imageHeight,
    width: imageWidth,
    borderRadius,
    marginRight: 5
  },
  conversationInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  userText: {
    padding: 5,
    fontSize: 16,
    ...TextShadow
  },
  messageSnippetText: {
    fontStyle: 'italic'
  }
}
