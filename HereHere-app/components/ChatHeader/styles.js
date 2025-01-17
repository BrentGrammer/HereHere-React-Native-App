import TextShadow from '../../constants/TextShadow';

export default {
  chatHeader: {
    flex: 1,
    textAlign: 'center',
    fontStyle: 'italic',
    ...TextShadow,
    fontSize: 18
  },
  chatHeaderContainer: {
    alignItems: 'center',
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    flexDirection: 'row',
    marginBottom: 5,
    paddingBottom: 5
  }, 
  buttonView: {
    width: '15%'
  },
  rightButtonView: {
    justifyContent: 'center', 
    alignItems: 'center'
  }
};
