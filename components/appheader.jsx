import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { clearSession } from "../lib/session"; 

export default function AppHeader({
  title = "Store",
  subtitle = "Management",
  onLogout,
}) {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          try {
            await clearSession();
            router.replace("/login");
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Error", "Unable to log out. Please try again.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <Image
          source={require("../assets/SmallStore.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logout}
        onPress={onLogout ?? handleLogout}
        activeOpacity={0.8}
      >
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "#D6ECFA",
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 14,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  titleWrap: {
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#000",
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#000",
    lineHeight: 30,
  },
  logout: {
    backgroundColor: "#4A7DB8",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    marginBottom: 7, // see note below
  },
  logoutText: {
    color: "#000",
    fontSize: 13,
    fontWeight: "700",
  },
});
