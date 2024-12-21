import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack } from "expo-router";
import { client } from '../apollo';
import { ApolloProvider } from "@apollo/client";
import { useNavigation } from '@react-navigation/native';
import UserProfileHeader from '../components/UserProfileHeader';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="index" options={{ title:"Splash Screen", headerShown: false }} />
        <Stack.Screen name="SignInScreen" options={{ title:"Sign In", headerShown: true, headerTitleAlign: "center" }} />
        <Stack.Screen name="SignUpScreen" options={{ title:"Sign Up", headerShown: true, headerTitleAlign: "center" }} />
        <Stack.Screen
          name="ProjectsScreen"
          options={{
            headerTitle: (props) => <UserProfileHeader /> 
          }}
        />
        <Stack.Screen name="ToDoScreen" options={{ title:"ToDo", headerShown: true, headerTitleAlign: "center" }} />
        <Stack.Screen name="UserProfileScreen" options={{ title:"User Profile", headerShown: true, headerTitleAlign: "center" }} />
        <Stack.Screen name="AddProjectsScreen" options={{ title:"Add Projects", headerShown: true, headerTitleAlign: "center" }} />
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      </Stack>
    </ApolloProvider>
  );
}