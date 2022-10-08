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
    height: '8%',
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
    height: '100%',
    fontFamily: 'Peralta_400Regular'
    // width: '20%',
  },

  buttons: {
    width: '100%',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    borderBottomRightRadius: 65,
    borderBottomLeftRadius: 65,
    borderWidth: 30,
    borderColor: '#d9edff',
    height: 450,
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
    width: '85%',
    paddingTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
  },

  inputTextField: {
    height: 50,
    width: '85%',
    backgroundColor: '#f2f2f2',
    paddingLeft: 10,
  },

  overlay: {
    flexDirection: 'column',
    width: '75%',
    height: '60%',
    borderRadius: 10,
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