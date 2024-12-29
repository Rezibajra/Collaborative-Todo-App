import React from 'react'
import { View, Text, Pressable, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useMutation, gql } from '@apollo/client';
import styles from './styles';

const DELETE_TASK_LIST = gql`
mutation deleteTaskList($id:ID!){
  deleteTaskList(id:$id)
}
`;

const MY_PROJECTS = gql `
query myTaskLists {
  myTaskLists {
    id
    title
    createdAt
  }
}
`;

interface ProjectItemProps {
  project: {
    id: string,
    title: string,
    createdAt: string,
  }
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  const navigation = useNavigation();
  const router = useRouter();

  // Hook for deleting task list
  const [deleteTaskList, { loading, error }] = useMutation(DELETE_TASK_LIST, {
    // Refetch the projects query after deletion
    refetchQueries: [{ query: MY_PROJECTS }],
  });

  const onPress = () => {
    router.push(`/ToDoScreen?taskId=${project.id}`);
    // navigation.navigate('ToDoScreen', { id: project.id })
  }

  // Function to handle project deletion
  const onDelete = async () => {
    // Confirm with the user before deleting
    Alert.alert(
      'Delete Project',
      `Are you sure you want to delete the project: "${project.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteTaskList({
                variables: { id: project.id },
              });
              console.log('Project deleted successfully');
              // Optionally, navigate away or refresh the list after deletion
            } catch (e) {
              console.error('Error deleting project', e);
              Alert.alert('Error', 'Failed to delete project. Please try again later.');
            }
          },
        },
      ]
    );
  };
  
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="folder-outline" size={24} color="white" />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
        <Text style={styles.title}>{project.title}</Text>
        <Pressable onPress={onDelete}>
          <MaterialCommunityIcons name="delete-outline" size={24} color="#e33062" />
        </Pressable>
      </View>
    </Pressable>
  )
}

export default ProjectItem