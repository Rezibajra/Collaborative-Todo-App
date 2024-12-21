import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useMutation, gql } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CREATE_TASKLIST_MUTATION = gql`
mutation createTaskList($title: String!) {
  createTaskList(title: $title) {
    id
    createdAt
    title
    progress
    users {
      id
      name
      avatar
    }
  }
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

const AddProjectsScreen = () => {
    const [title, setTitle] = useState('')

    const navigation = useNavigation();

    const [createTaskList, {data, error, loading }] = useMutation(CREATE_TASKLIST_MUTATION, {refetchQueries: [{ query: MY_PROJECTS }]});

    useEffect(() => {
        if (error) {
            Alert.alert('Error creating the project.');
        }
    }, [error])

    useEffect(() => {
        if (data) {
            navigation.navigate('ProjectsScreen')
        }
    }, [data])
    
    // if (data) {
        // AsyncStorage
        //     .setItem('token', data.signIn.token)
        //     .then(() => {
        //         navigation.navigate('ProjectsScreen')
        //     })
        // setProject(data.getTaskList);
        //   setTitle(data.getTaskList.title);
    // }

    // useEffect(() => {
    //     // Simulating fetching data and then updating state
    //     fetchProjects().then(newProjects => {
    //       setProjects(newProjects); // Safe to call here
    //     });
    // }, []);

    // useEffect(() => {
    //     if (data) {
    //       setProject(data.getTaskList);
    //       setTitle(data.getTaskList.title);
    //     }
    //   }, [data]);
    
    const onSubmit = () => {    
        createTaskList({ variables: { title }})
    }

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Operation: Get Things Done"
                value={title}
                onChangeText={setTitle}
                style={{
                    color: 'black',
                    fontSize: 18,
                    width: '100%',
                    marginVertical: 25,
                }}
            />

            <Pressable onPress={onSubmit} 
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
    )
}

export default AddProjectsScreen;