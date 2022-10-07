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
    paddingRight: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
  closecircle: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  tabView: {
    width: '100%',
  },
  acceptedProfiles: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default styles;