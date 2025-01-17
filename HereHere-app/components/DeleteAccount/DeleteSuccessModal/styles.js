import TextShadowStyle from '../../../constants/TextShadow';

export default {
  container: {
    padding: 10,
    marginTop: 22,
    flex: 1
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  okButtonContainer: {
    width: '50%',
    marginTop: 15
  },
  successText: {
    ...TextShadowStyle,
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: "center"
  }
};