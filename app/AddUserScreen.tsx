import React, { useState, useEffect } from "react";
import { View, Text, Alert, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import { useQuery, gql, useMutation } from "@apollo/client";
import { useLocalSearchParams } from 'expo-router';

// GraphQL query to fetch users
const GET_USERS_QUERY = gql`
  query getUsers {
    getUsers {
      id
      name
    }
  }
`;

const ADD_USER_TO_TASKLIST = gql`
  mutation addUserToTaskList($taskListId: ID!, $userId: ID!) {
    addUserToTaskList(taskListId: $taskListId, userId: $userId) {
      id
      users {
        id
        name
      }
    }
  }
`;

const AddUserScreen = () => {
    // const { taskId } = route.params || {};
    // const router = useRouter();
    const navigation = useNavigation();
    const { taskId } = useLocalSearchParams();
    const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user
    const { data, loading, error } = useQuery(GET_USERS_QUERY);
    const [addUserToTaskList] = useMutation(ADD_USER_TO_TASKLIST);

    useEffect(() => {
        console.log('taskId from route:', taskId);  // Check if taskId is coming through
    }, [taskId]);

    if (loading) return <Text>Loading users...</Text>;
    if (error) return <Text>Error loading users</Text>;

    const handleSelectUser = (userId) => {
        setSelectedUser(userId); // Set selected user ID
    };

    const handleAddUser = () => {
        if (!selectedUser) {
          Alert.alert('Please select a user');
          return;
        }
    
        addUserToTaskList({
          variables: {
            taskListId: taskId,
            userId: selectedUser,
          },
        })
          .then(response => {
            Alert.alert('User added to task list successfully!');
            // navigation.navigate('ToDoScreen')
          })
          .catch(err => {
            Alert.alert('Error adding user to task list.');
          });
      };

    return (
        <View style={{ padding: 20 }}>

            {/* Dropdown to select a user */}
            <Picker
                selectedValue={selectedUser}
                onValueChange={handleSelectUser} // Update selected user on change
                style={{
                    height: 50,
                    width: '100%',
                    marginVertical: 15,
                    borderWidth: 1,
                    borderColor: '#e33062',
                    borderRadius: 5,
                }}
            >
                <Picker.Item label="Select a user" value={null} style={{ color: '#e33062' }}/>
                {data.getUsers.map((user) => (
                    <Picker.Item key={user.id} label={user.name} value={user.id} />
                ))}
            </Picker>

            <Pressable onPress={handleAddUser}
                disabled={loading}
                style={{
                    backgroundColor: '#e33062',
                    height: 50,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
                <Text 
                    style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>Add</Text>
            </Pressable>
        </View>
    );
};

export default AddUserScreen;
