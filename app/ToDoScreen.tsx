import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useMutation, gql, useQuery } from "@apollo/client";
import { useRoute } from '@react-navigation/native';
import ToDoItem from '../components/ToDoItem';
import { useTheme } from '@react-navigation/native';
import FloatingButton from '../components/FloatingButton';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';

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

export const useRefetchOnFocus = (refetch: () => Promise<any>) => {
  const [isRefetching, setIsRefetching] = useState(false);

  // Refetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsRefetching(true); // Start refetching
        try {
          await refetch(); // Wait for refetch to complete
        } catch (error) {
          console.error("Error refetching data:", error);
        } finally {
          setIsRefetching(false); // End refetching
        }
      };
      
      fetchData();
    }, [refetch])
  );

  return isRefetching; // Return whether the refetch is still in progress
};

export default function ToDoScreen() {
  const { colors } = useTheme();
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState('');
  const { taskId } = useLocalSearchParams();

  // const route = useRoute();
  const id = taskId;

  const { data, error, loading, refetch } = useQuery(GET_PROJECT, { variables: { id }})

  // State to track if refetch has completed
  const [refetchCompleted, setRefetchCompleted] = useState(false);

  // Use custom hook to trigger refetch when screen is focused
  const isRefetching = useRefetchOnFocus(refetch);

  // const { data, error, loading } = useQuery(GET_PROJECT, { variables: { id }})

  const [
    createToDo, { data: createTodoData, error: createTodoError }
  ] = useMutation(CREATE_TODO, {refetchQueries: [{ query: GET_PROJECT }]});
  
  // const [createDefaultToDo] = useMutation(CREATE_DEFAULT_TODO_MUTATION);

  
  useEffect(() => {
    if (data) {
      setProject(data.getTaskList);
      setTitle(data.getTaskList.title);
      setRefetchCompleted(true);
    }
  }, [data]);
  
  useEffect(() => {
    if (error) {
      console.log('Error fetching project', error);
    }
  }, [error]);

  useEffect(() => {
    if (refetchCompleted && project && project.todos.length === 0) {
      createToDo({
        variables: {
          content: '',
          taskListId: id,
        }
      }).then(() => {
        console.log('Default empty todo created');
      }).catch((err) => {
        console.error('Error creating default todo:', err);
      });
    }
  }, [refetchCompleted, project, createToDo, id]);

  const createNewItem = (atIndex:number) => {
    createToDo({
      variables: {
        content: '',
        taskListId: id,
      }
    })
  }

  const handleDeleteTodo = (deletedTodoId: string) => {
    if (project && project.todos) {  // Make sure project and todos are valid
      setProject((prevProject) => ({
        ...prevProject,  // Spread the previous project object
        todos: prevProject.todos.filter(todo => todo.id !== deletedTodoId),  // Remove the deleted todo
      }));
    }
  };

  if (loading || isRefetching || !refetchCompleted) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e33062" />
      </View>
    );
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
              onDelete={handleDeleteTodo}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
