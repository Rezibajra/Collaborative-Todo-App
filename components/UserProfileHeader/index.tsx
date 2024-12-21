import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface UserProfileHeaderProps {
//   onPress: () => void;
//   icon: any,
}

const UserProfileHeader = (props: UserProfileHeaderProps) => {
  const navigation = useNavigation();
  const onPress = () => {
    // alert(`I'm being clicked!`)
    navigation.navigate('UserProfileScreen')
  }
  return (
    // <TouchableOpacity onPress={props.onPress} style={styles.floatinBtn}>
    //   <View
    //     style={{
    //       backgroundColor: '#e33062',
    //       width: 65,
    //       height: 65,
    //       borderRadius: 45,
    //       justifyContent: 'center', // Center the icon horizontally
    //       alignItems: 'center', // Center the icon vertically
    //     }}>
    //     <MaterialCommunityIcons name={props.icon} size={30} color="white" />
    //   </View>
    // </TouchableOpacity>
    <View style={styles.headerContainer}>
        <Text style={styles.title}>Projects</Text>
        <TouchableOpacity onPress={onPress}>
            <Image
            source={{ uri: 'https://www.w3schools.com/w3images/avatar5.png' }} // Custom avatar for this screen
            style={styles.profileImage}
            />
        </TouchableOpacity>
    </View>
  )
}

export default UserProfileHeader