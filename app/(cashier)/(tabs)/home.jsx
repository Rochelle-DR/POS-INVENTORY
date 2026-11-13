import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function CashierHome() {
  return (
    <SafeAreaView style={styles.screen} edges={[]}>
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Today's Overview</Text>

          <View style={styles.grid}>
            <StatCard label="Total Sales" />
            <StatCard label="Transactions" value="0" />
          </View>
        </View>

        <View style={[styles.panel, styles.noticePanel]}>
          <Text style={styles.panelTitle}>Notice!</Text>

          {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.line} />
          ))}
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
    paddingTop: 38,
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
});