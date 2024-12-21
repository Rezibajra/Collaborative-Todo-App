import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useMutation, gql, useQuery } from "@apollo/client";
import { useRoute } from '@react-navigation/native';
import ToDoItem from '../components/ToDoItem';
import { useTheme } from '@react-navigation/native';
import FloatingButton from '../components/FloatingButton';
import { useLocalSearchParams } from 'expo-router';

const GET_PROJECT = gql`
query getTasklist($id:ID!) {
  getTaskList(id:$id) {
    id
    title
    createdAt
    todos {
      id
      content
      isCompleted
    }
  }
}
`;

const CREATE_TODO = gql`
mutation createTodo($content: String!, $taskListId: ID!) {
  createToDo(content: $content, taskListId: $taskListId) {
    id
    content
    isCompleted
    taskList {
      id
      progress
      todos {
        id
        content
        isCompleted
      }
    }
  }
}
`;

let id = '4'

export default function ToDoScreen() {
  const { colors } = useTheme();
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState('');
  const { taskId } = useLocalSearchParams();

  // const route = useRoute();
  const id = taskId;

  const { data, error, loading } = useQuery(GET_PROJECT, { variables: { id }})

  const [
    createToDo, { data: createTodoData, error: createTodoError }
  ] = useMutation(CREATE_TODO, { refetchQueries: GET_PROJECT });

  useEffect(() => {
    if (error) {
      console.log('Error fetching project');
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setProject(data.getTaskList);
      setTitle(data.getTaskList.title);
    }
  }, [data]);

  const createNewItem = (atIndex:number) => {
    createToDo({
      variables: {
        content: '',
        taskListId: id,
      }
    })
  }

  if (!project) {
    return null;
  }

  return (
      <View style={styles.container}>
        <TextInput 
          value={title}
          onChangeText={setTitle}
          placeholder={'Title'}
          style={styles.title}
        />
        <FlatList
          data={project.todos}
          removeClippedSubviews={false}
          renderItem={({ item, index }) => (
            <ToDoItem 
              todo={item} 
              onSubmit={() => createNewItem(index+1)}
            />
            )}
            style={{ width: '100%'}}
        />
        <FloatingButton 
          icon = "account-plus"
          project_id = {id}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  title: {
    width: '100%',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
