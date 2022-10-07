import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  requestContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d9edff'
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
  },
  text: {
    paddingTop: 80,
    paddingLeft: 135,
  },
  photo: {
    position: 'relative',
    alignSelf: 'center',
    top: 50,
    width: 240,
    height: 240 * 1.2,
  }
});

export default styles;