import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface FloatingButtonProps {
  icon: any,
  project_id: string
}

const FloatingButton = (props: FloatingButtonProps) => {
  const navigation = useNavigation();
  const router = useRouter();
  
  const onPress = () => {
    navigation.navigate('AddProjectsScreen')
  }

  const onAccountPress = () => {
    router.push(`/AddUserScreen?taskId=${props.project_id}`);
    // navigation.navigate('AddUserScreen', { taskId: props.project_id })
  }

  return (
    <TouchableOpacity onPress={props.icon === 'account-plus' ? onAccountPress: onPress} style={styles.floatinBtn}>
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