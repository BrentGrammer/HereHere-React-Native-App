const imageHeight = 35;
const imageWidth = 35;
const borderRadius = imageWidth / 2;

export default {
  messageItem: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderTopColor: 'gray',
    marginLeft: 5
  }, 
  image: {
    height: imageHeight,
    width: imageWidth,
    borderRadius,
    marginTop: 10,
    marginBottom: 5
  },
  container: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center'
  }
};
