import React, { useState } from 'react';
import { StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import ProjectItem from '../components/ProjectItem';
import { Text, View } from '@/components/Themed';
import { useTheme } from '@react-navigation/native';

export default function ProjectsScreen() {
  const [project, setProjects] = useState([{
    id: '1',
    title: 'Project 1',
    createdAt: '2d'
  }, {
    id: '2',
    title: 'Project 2',
    createdAt: '2d'
  }, {
    id: '3',
    title: 'Project 3',
    createdAt: '2d'
  }]);
  return (
      <View style={styles.container}>
        <FlatList
          data={project}
          renderItem={({item}) => <ProjectItem project={item} />}
          style={{ width: '100%' }}
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

  }
});
