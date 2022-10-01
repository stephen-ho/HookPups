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
    width: '100%',
    height: '8%',
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
    backgroundColor: '#bde0fe',
    flexDirection: 'column',
  },
  image: {
    height: 100,
    width: 100,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    padding: 5,
    border: '1px solid black',
    backgroundColor: '#a2d2ff',
  },
  leftContainer: {
    flexDirection: 'column',
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  rightContainer: {
    flexDirection: 'column',
  }
})

export default styles;