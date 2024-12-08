import { Stack } from "expo-router";
import { client } from '../apollo';
import { ApolloProvider } from "@apollo/client";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="index" options={{ title:"Splash Screen", headerShown: false }} />
        <Stack.Screen name="SignInScreen" options={{ title:"Sign In", headerShown: true, headerTitleAlign: "center" }} />
        <Stack.Screen name="SignUpScreen" options={{ title:"Sign Up", headerShown: true, headerTitleAlign: "center" }} />
        <Stack.Screen name="ProjectsScreen" options={{ title:"Home", headerShown: true, headerTitleAlign: "center" }} />
        <Stack.Screen name="ToDoScreen" options={{ title:"ToDo", headerShown: true, headerTitleAlign: "center" }} />
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      </Stack>
    </ApolloProvider>
  );
}
