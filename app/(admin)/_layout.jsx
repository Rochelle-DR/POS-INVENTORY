import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AdminLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="cashier" />
      </Stack>
    </>
  );
}