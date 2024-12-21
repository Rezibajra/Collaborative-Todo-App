import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FloatingButtonProps {
  icon: any,
}

const FloatingButton = (props: FloatingButtonProps) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('AddProjectsScreen')
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.floatinBtn}>
      <View
        style={{
          backgroundColor: '#e33062',
          width: 65,
          height: 65,
          borderRadius: 45,
          justifyContent: 'center', // Center the icon horizontally
          alignItems: 'center', // Center the icon vertically
        }}>
        <MaterialCommunityIcons name={props.icon} size={30} color="white" />
      </View>
    </TouchableOpacity>
  )
}

export default FloatingButton