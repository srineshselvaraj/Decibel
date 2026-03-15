import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          title: "Home"
        }} 
      />
      <Stack.Screen 
        name="rooms" 
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1a0f2e",
          },
          headerTintColor: "#e8d4ff",
          headerTitle: "Rooms",
          headerBackTitle: "",
        }} 
      />
      <Stack.Screen 
        name="room/[id]" 
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1a0f2e",
          },
          headerTintColor: "#e8d4ff",
          headerTitle: "Room Details",
          headerBackTitle: "",
        }} 
      />
      <Stack.Screen 
        name="decibot" 
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1a0f2e",
          },
          headerTintColor: "#e8d4ff",
          headerTitle: "DeciBot",
          headerBackTitle: "",
        }} 
      />
      <Stack.Screen 
        name="recommendations" 
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1a0f2e",
          },
          headerTintColor: "#e8d4ff",
          headerTitle: "Recommendations",
          headerBackTitle: "",
        }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1a0f2e",
          },
          headerTintColor: "#e8d4ff",
          headerTitle: "Profile",
          headerBackTitle: "",
        }} 
      />
      <Stack.Screen 
        name="saved" 
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1a0f2e",
          },
          headerTintColor: "#e8d4ff",
          headerTitle: "Saved",
          headerBackTitle: "",
        }} 
      />
    </Stack>
  );
}
