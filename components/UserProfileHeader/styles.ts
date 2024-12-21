import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    profileImage: {
      position: 'absolute',
      right: -210,
      bottom: -20,
      width: 40,
      height: 40,
      borderRadius: 20,
    },
});

export default styles;