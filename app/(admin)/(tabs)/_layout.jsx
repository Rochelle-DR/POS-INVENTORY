import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyTabBar } from "../../../components/tabBar";
import AppHeader from "../../../components/appheader";

const HEADER_BG = {
  home: "#FFFFFF",
  sell: "#B8DDF5",
  utang: "#B8DDF5",
  stock: "#B8DDF5",
  product: "#FFFFFF",
};

function Header({ bg = "#FFFFFF" }) {
  const insets = useSafeAreaInsets();
  const isDark = bg !== "#FFFFFF";

  return (
    <View style={{ paddingTop: insets.top + 12, backgroundColor: bg }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <AppHeader title="Store" subtitle="Management" />
    </View>
  );
}


export default function AdminLayout() {
  return (
    <Tabs
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={({ route }) => ({
        header: () => <Header bg={HEADER_BG[route.name] ?? "#FFFFFF"} />,
        tabBarShowLabel: false,
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="sell" />
      <Tabs.Screen name="utang" />
      <Tabs.Screen name="stock" />
      <Tabs.Screen name="product" />
    </Tabs>
  );
}