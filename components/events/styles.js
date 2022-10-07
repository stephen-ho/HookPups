import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  phone: {
    flexDirection: 'column',
    backgroundColor: '#d9edff',
    height: 10,
    width: '100%',
    flex: 1,
    // alignItems: 'center',
  },

  header: {
    backgroundColor: '#a2d2ff',
    height: '5%',
  },

  headerBack: {
    position: 'absolute',
    top: 8,
    left: 10,
    zIndex: 2,
    elevation: 2,
  },

  headerText: {
    textAlign: 'center',
    fontSize: 30,
    height: '100%'
    // width: '20%',
  },

  buttons: {
    width: '75%',
    alignSelf: 'center',
    // alignItems: 'center',
  },

  topBar: {
    width: '100%',
    height: '12%',
    backgroundColor: '#cdb4db',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topBarText: {
    fontSize: '30px',
  },

  calendar: {
    // width: '90%',
    // height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderTopLeftRadius: 65,
    borderTopRightRadius: 65,
    borderWidth: 30,
    borderColor: '#d9edff'
    // calendarBackground: '#ffffff',
  },

  calendarTheme: {
    backgroundColor: '#bde0fe',
    selectedDayBackgroundColor: '#ffc8dd',
    selectedDayTextColor: '#ffffff',
    dotColor: '#a2d2ff',
  },

  eventPage: {
    height: 500,
    width: '100%',
    paddingTop: 10,
    backgroundColor: '#d9edff',
    flexDirection: 'column',
  },

  eventPageHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#a2d2ff',
  },

  eventPageDate: {
    fontSize: 20,
    textAlign: 'center',
  },

  eventPanel: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  eventPanelLeft: {
    flex: 0,
    width: '25%',
  },

  inputChooser: {
    width: '75%',
  },

  inputTextField: {
    height: 50,
    width: '75%',
    backgroundColor: '#f2f2f2',
  },

  overlay: {
    flexDirection: 'column',
    width: '75%',
    height: '80%',
  },

  overlayHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },

  overlayItems: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f2f2f2',
    marginBottom: 4,
  },
});

export default styles;