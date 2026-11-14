import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors,colors2, radius, fonts, interFonts } from "../../../constants/theme";

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
    backgroundColor: colors.screenBg,
  },
  body: {
    padding: 12,
    paddingTop: 38,
    paddingBottom: 24,
    gap: 18,
  },
  panel: {
    backgroundColor: colors.body,
    borderRadius: radius.card,
    padding: 12,
    gap: 15,
  },
  panelTitle: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.text,
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
    backgroundColor: colors2.cardLight,
    borderRadius: radius.input,
    padding: 10,
    justifyContent: "space-between",
  },
  statLabel: {
    fontFamily: interFonts.medium,
    fontSize: 22,
    color: colors.placeholder,
  },
  statValue: {
    fontFamily: interFonts.bold,
    fontSize: 20,
    color: colors.text,
  },
  noticePanel: {
    minHeight: 150,
  },
  line: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 8,
    opacity: 0.5,
  },
});