const imageHeight = 35;
const imageWidth = 35;
const borderRadius = imageWidth / 2;

export default {
  chatMessageContainer: {
    flex: 1,
    marginLeft: 5
  },
  chatMessageItem: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderTopColor: 'gray'
  },
  image: {
    height: imageHeight,
    width: imageWidth,
    borderRadius,
    marginTop: 10,
    marginBottom: 5
  },
  messageItemContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  messageTouchable: {
    flexDirection: 'row'
  }
};
