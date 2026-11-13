import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

function StatCard({ label, value = "₱0.00" }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel} numberOfLines={1} adjustsFontSizeToFit>
        {label}
      </Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export default function Home() {
  const router = useRouter();

  const handleManageCashiers = () => {
    router.push("/(admin)/cashier"); 
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Today's Overview</Text>

          <View style={styles.grid}>
            <StatCard label="Total Sales" />
            <StatCard label="Total Utang" />
            <StatCard label="Transactions" value="0" />
            <StatCard label="Profits" />
          </View>
        </View>

        <View style={[styles.panel, styles.noticePanel]}>
          <Text style={styles.panelTitle}>Notice!</Text>

          {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.line} />
          ))}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.8}
            onPress={() => {
              
            }}
          >
            <Text style={styles.actionText}>ADMIN ACCOUNT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.8}
            onPress={handleManageCashiers}
          >
            <Text style={styles.actionText}>MANAGE CASHIERS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  body: {
    padding: 12,
    paddingTop: 2,
    paddingBottom: 24,
    gap: 18,
  },
  panel: {
    backgroundColor: "#A8D8F0",
    borderRadius: 12,
    padding: 12,
    gap: 15,
  },
  panelTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000", 
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  statCard: {
    width: "48%",
    minHeight: 100,
    backgroundColor: "#D6ECFA",
    borderRadius: 8,
    padding: 10,
    justifyContent: "space-between",
  },
  statLabel: {
    fontSize: 22,
    fontWeight: "500",
    color: "#989898",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1B2A41",
  },
  noticePanel: {
    minHeight: 150,
  },
  line: {
    height: 1,
    backgroundColor: "#1B2A41",
    marginTop: 8,
    opacity: 0.5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  actionBtn: {
    flex: 1,
    maxWidth: 160,
    height: 50,
    backgroundColor: "#4B80BB",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    color: "#000", 
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
});
