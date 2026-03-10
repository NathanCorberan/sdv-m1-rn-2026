import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <>
          <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="create-task" options={{ title: "Creer une tache" }} />
          </Stack>
      </>
  );
}
