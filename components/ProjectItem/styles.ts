import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    root: {
      flexDirection: 'row',
      width: '100%',
      padding: 10,
    },
    iconContainer: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: '#404040',
      marginRight: 10,
    },
    title: {
      fontSize: 20,
      color: 'black',
      marginRight: 5,
    },
    time: {
      color: 'darkgrey',
  
    }
});

export default styles;