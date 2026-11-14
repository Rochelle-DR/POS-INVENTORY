// app/(cashier)/(tabs)/stock.jsx
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radius, fonts, interFonts } from "../../../constants/theme";

const INITIAL = [
 
];

const MIN_ROWS = 6;

export default function Stock() {
  const [items] = useState(INITIAL);

  const fillerCount = Math.max(0, MIN_ROWS - items.length);

  return (
    <SafeAreaView style={styles.screen} edges={[]}>
      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.title}>Product Stock</Text>

          <ScrollView
            style={styles.list}
            contentContainerStyle={items.length === 0 && styles.emptyWrap}
            showsVerticalScrollIndicator={false}
          >
            {items.length === 0 ? (
              <View style={styles.empty}>
                <Text style={styles.emptyTitle}>No products yet</Text>
                <Text style={styles.emptySub}>
                  Ask the admin to add products.
                </Text>
              </View>
            ) : (
              <>
                {items.map((item) => (
                  <View key={item.id} style={styles.row}>
                    <View style={styles.nameCol}>
                      <Text style={styles.name} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.price}>₱{item.price}</Text>
                    </View>

                    <View style={styles.stockCol}>
                      <Text style={styles.stockText}>
                        {item.stock === 0 ? "Out" : item.stock}
                      </Text>
                    </View>
                  </View>
                ))}

                {Array.from({ length: fillerCount }).map((_, i) => (
                  <View key={`empty-${i}`} style={styles.row}>
                    <View style={styles.nameCol} />
                    <View style={styles.stockCol} />
                  </View>
                ))}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.body,
  },
  body: {
    flex: 1,
    padding: 16,
    paddingTop: 45,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.card,
    overflow: "hidden",
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  list: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    height: 56,
    borderTopWidth: 1.5,
    borderColor: colors.border,
  },
  nameCol: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderRightWidth: 1.5,
    borderColor: colors.border,
  },
  name: {
    fontSize: 18,
    fontFamily: interFonts.semibold,
    color: colors.text,
  },
  price: {
    fontSize: 14,
    fontFamily: interFonts.semibold,
    color: colors.text,
  },
  stockCol: {
    width: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  stockText: {
    fontSize: 14,
    fontFamily: interFonts.semibold,
    color: colors.text,
  },
  emptyWrap: {
    flexGrow: 1,
    justifyContent: "center",
  },
  empty: {
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 6,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: interFonts.semibold,
    color: colors.text,
  },
  emptySub: {
    fontSize: 14,
    fontFamily: interFonts.regular,
    color: colors.placeholder,
    textAlign: "center",
  },
});