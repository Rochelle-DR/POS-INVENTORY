import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyTabBar } from "../../../components/tabBar";
import AppHeader from "../../../components/appheader";

function Header() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top + 12, backgroundColor: "#FFFFFF" }}>
      <AppHeader title="Store" subtitle="Management" />
    </View>
  );
}

export default function CashierLayout() {
  return (
    <>
      <StatusBar style="auto" />

      <Tabs
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{
          header: () => <Header />,
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