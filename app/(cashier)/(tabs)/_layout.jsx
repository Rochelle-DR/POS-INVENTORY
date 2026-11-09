import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {MyTabBar} from "../../../components/tabBar";

export default function CashierLayout() {
  return (
    <>
      <StatusBar style="auto" />

      <Tabs
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="sell" />
        <Tabs.Screen name="utang" />
        <Tabs.Screen name="stock" />
      </Tabs>
    </>
  );
}