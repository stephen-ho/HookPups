import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  requestContainer: {
    width: '100%',
    height: '100%',
  },
  bio: {
    flexDirection: 'column',
    paddingBottom: 10
  },
  name: {
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    paddingLeft: 200,
  },
  closecircle: {
    paddingRight: 30,
    paddingLeft: 10,
  }
});

export default styles;