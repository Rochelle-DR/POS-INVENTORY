import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { MyTabBar } from "../../../components/tabBar";
import AppHeader from "../../../components/appheader";

function Header() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, backgroundColor: "#ffffff" }}>
      <AppHeader title="Store" subtitle="Management" />
    </View>
  );
}

export default function AdminLayout() {
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
        <Tabs.Screen name="product" />
      </Tabs>
    </>
  );
}