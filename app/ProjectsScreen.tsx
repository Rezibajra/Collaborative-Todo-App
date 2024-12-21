import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from 'react-native';
import ProjectItem from '../components/ProjectItem';
import { Text, View } from '@/components/Themed';
import { useTheme } from '@react-navigation/native';
import { useQuery , gql} from '@apollo/client';
import FloatingButton from '../components/FloatingButton';

const MY_PROJECTS = gql `
query myTaskLists {
  myTaskLists {
    id
    title
    createdAt
  }
}
`;

export default function ProjectsScreen() {
  const [project, setProjects] = useState([]);

  const { data, error, loading } = useQuery(MY_PROJECTS)

  useEffect(() => {
    if (error) {
      Alert.alert('Error fetching projects', error.message);
    }
  }, [error])

  useEffect(() => {
    if (data) {
      setProjects(data.myTaskLists);
    }
  }, [data])

  return (
      <View style={styles.container}>
        <FlatList
          data={project}
          renderItem={({item}) => <ProjectItem project={item} />}
          style={{ width: '100%' }}
        />
        <FloatingButton 
          icon = "folder-plus"
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#404040',
    marginRight: 10,
  },
  title: {
    // width: '100%',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 5,
  },
  time: {
    color: 'darkgrey',
  },
  floatinBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
});
