import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radius, colors2, interFonts } from "../../../constants/theme";

function InputCard({ label, ...props }) {
  return (
    <TextInput
      style={styles.card}
      placeholder={label}
      placeholderTextColor={colors.placeholder}
      {...props}
    />
  );
}

export default function Product() {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !stock || !price || !cost) {
      Alert.alert("Missing info", "Please fill in all fields.");
      return;
    }

    console.log({
      name: name.trim(),
      stock: Number(stock),
      price: Number(price),
      cost: Number(cost),
    });
    setName("");
    setStock("");
    setPrice("");
    setCost("");
  };

  return (
    <SafeAreaView style={styles.screen} edges={[]}>
      <ScrollView
        contentContainerStyle={styles.body}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.panel}>
          <View style={styles.grid}>
            <InputCard label="NAME" value={name} onChangeText={setName} />
            <InputCard
              label="STOCK"
              value={stock}
              onChangeText={setStock}
              keyboardType="number-pad"
            />
            <InputCard
              label="PRICE"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />
            <InputCard
              label="COST"
              value={cost}
              onChangeText={setCost}
              keyboardType="decimal-pad"
            />
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={handleAdd}
          >
            <Text style={styles.addText}>ADD</Text>
          </TouchableOpacity>
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
    paddingTop: 100,
    paddingBottom: 24,
  },
  panel: {
    backgroundColor: colors.body,
    borderRadius: radius.card,
    padding: 10,
    gap: 12,
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
    width: "100%",
  },
  card: {
    width: "48%",
    height: 55,
    backgroundColor: colors2.cardLight,
    borderRadius: radius.input,
    paddingHorizontal: 14,
    fontFamily: interFonts.semibold,
    fontSize: 20,
    color: colors.text,
  },
  addBtn: {
    width: 130,
    height: 42,
    backgroundColor: colors.button,
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: radius.button,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    fontFamily: interFonts.semibold,
    color: colors.text,
    fontSize: 22,
    fontWeight:700,
  },
});