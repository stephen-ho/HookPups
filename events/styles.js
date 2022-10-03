import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  phone: {
    flexDirection: 'column',
    backgroundColor: '#ffc8dd',
    height: 10,
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    height: '12%',
    backgroundColor: '#cdb4db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '6.5%',
    backgroundColor: '#cdb4db',
  },
  topBarText: {
    fontSize: '30px',
  },
  calendar: {
    width: '90%',
    height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#bde0fe',
  },
  eventPage: {
    height: 500,
    width: '90%',
    paddingTop: 10,
    backgroundColor: '#bde0fe',
    flexDirection: 'column',
  },
  eventPanel: {
    marginBottom: 20,
  },
  eventPanelLeft: {
    flex: 0,
    width: '25%',
  }
})

export default styles;