import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title:"Splash Screen", headerShown: false }} />
      <Stack.Screen name="SignInScreen" options={{ title:"Sign In", headerShown: true, headerTitleAlign: "center" }} />
      <Stack.Screen name="SignUpScreen" options={{ title:"Sign Up", headerShown: true, headerTitleAlign: "center" }} />
      <Stack.Screen name="ProjectsScreen" options={{ title:"Home", headerShown: true, headerTitleAlign: "center" }} />
      <Stack.Screen name="ToDoScreen" options={{ title:"ToDo", headerShown: true, headerTitleAlign: "center" }} />
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
