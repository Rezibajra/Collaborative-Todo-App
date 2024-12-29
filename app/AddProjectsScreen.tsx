import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useMutation, gql } from "@apollo/client";

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

const CREATE_TODO_MUTATION = gql`
mutation createTodoList($content: String!, $taskListId: ID!) {
  createToDo(content: $content, taskListId: $taskListId) {
    id
    content
    isCompleted
    taskList {
      id
      progress
    }
  }
}
`;

const AddProjectsScreen = () => {
    const [title, setTitle] = useState('')

    const navigation = useNavigation();

    const [createTaskList, {data, error, loading }] = useMutation(CREATE_TASKLIST_MUTATION, {refetchQueries: [{ query: MY_PROJECTS }]});
    const [createToDo] = useMutation(CREATE_TODO_MUTATION);

    useEffect(() => {
        if (error) {
            Alert.alert('Error creating the project.');
        }
    }, [error])

    useEffect(() => {
        if (data) {
            createToDo({
                variables: {
                    content: '', // or any default content
                    taskListId: data.createTaskList.id,
                }
            });
            navigation.navigate('ProjectsScreen')
        }
    }, [data])
    
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