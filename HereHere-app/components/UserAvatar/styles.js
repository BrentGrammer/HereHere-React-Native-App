const imageHeight = 100;
const imageWidth = 100;
const borderRadius = imageWidth / 2;

const styles = {
  container: {
    alignItems: 'center',
    marginBottom: 20
  },
  button_container: {
    width: 250,
    marginBottom: 15
  },
  errorMessage: {
    color: 'red'
  },
  image: {
    height: imageHeight,
    width: imageWidth,
    borderRadius,
    marginTop: 10,
    marginBottom: 5
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16
  },
  loading_container: {
    flex: 1,
    justifyContent: 'center'
  }
};

export default styles;