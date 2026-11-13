import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radius, fonts, interFonts } from "../../../constants/theme";

const INITIAL = [];

const MIN_ROWS = 6; 

export default function Stock() {
  const [items, setItems] = useState(INITIAL);
  const [selectedId, setSelectedId] = useState(null);
  const [modal, setModal] = useState(null);
  const [qty, setQty] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const openAdd = (item) => {
    setQty("");
    setModal({ type: "add", item });
  };

  const openEdit = (item) => {
    setName(item.name);
    setPrice(String(item.price));
    setModal({ type: "edit", item });
  };

  const closeModal = () => setModal(null);

  const handleSave = () => {
    const { type, item } = modal;

    if (type === "add") {
      const amount = parseInt(qty, 10);

      if (!Number.isInteger(amount) || amount <= 0) {
        Alert.alert("Invalid", "Enter a whole number greater than 0.");
        return;
      }

      setItems((prev) =>
        prev.map((p) =>
          p.id === item.id ? { ...p, stock: p.stock + amount } : p
        )
      );
    } else {
      if (!name.trim() || price === "") {
        Alert.alert("Missing info", "Please fill in all fields.");
        return;
      }

      setItems((prev) =>
        prev.map((p) =>
          p.id === item.id
            ? { ...p, name: name.trim(), price: Number(price) }
            : p
        )
      );
    }

    
    closeModal();
  };

  const handleDelete = () => {
    const item = items.find((p) => p.id === selectedId);

    if (!item) {
      Alert.alert("Select a product", "Tap a row first, then press DELETE.");
      return;
    }

    Alert.alert("Delete product", `Delete "${item.name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setItems((prev) => prev.filter((p) => p.id !== item.id));
          setSelectedId(null);
        
        },
      },
    ]);
  };

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
                  Add a products.
                </Text>
              </View>
            ) : (
              <>
                {items.map((item) => (
                  <Pressable
                    key={item.id}
                    style={[
                      styles.row,
                      selectedId === item.id && styles.rowSelected,
                    ]}
                    onPress={() =>
                      setSelectedId(selectedId === item.id ? null : item.id)
                    }
                  >
                    <View style={styles.nameCol}>
                      <Text style={styles.name} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.price}>₱{item.price}</Text>
                    </View>

                    <View style={styles.stockCol}>
                      <Text style={styles.stockText}>{item.stock}</Text>
                    </View>

                    <View style={styles.actionsCol}>
                      <TouchableOpacity
                        style={styles.smallBtn}
                        activeOpacity={0.8}
                        onPress={() => openAdd(item)}
                      >
                        <Text style={styles.smallBtnText}>ADD</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.smallBtn}
                        activeOpacity={0.8}
                        onPress={() => openEdit(item)}
                      >
                        <Text style={styles.smallBtnText}>EDIT</Text>
                      </TouchableOpacity>
                    </View>
                  </Pressable>
                ))}

                {Array.from({ length: fillerCount }).map((_, i) => (
                  <View key={`empty-${i}`} style={styles.row}>
                    <View style={styles.nameCol} />
                    <View style={styles.stockCol} />
                    <View style={styles.actionsCol} />
                  </View>
                ))}
              </>
            )}
          </ScrollView>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.deleteBtn, items.length === 0 && styles.disabled]}
          disabled={items.length === 0}
          activeOpacity={0.8}
          onPress={handleDelete}
        >
          <Text style={styles.deleteText}>DELETE</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={!!modal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.backdrop}>
          <View style={styles.container}>
            {modal?.type === "add" ? (
              <>
                <Text style={styles.ProductTitle}>
                  Add stock: {modal.item.name}
                </Text>

                <View style={styles.inputCard}>
                  <TextInput
                    style={styles.input}
                    placeholder="QUANTITY"
                    placeholderTextColor={colors.placeholder}
                    keyboardType="number-pad"
                    value={qty}
                    onChangeText={(t) => setQty(t.replace(/[^0-9]/g, ""))}
                    autoFocus
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.ProductTitle}>Edit product</Text>

                <View style={styles.inputCard}>
                  <TextInput
                    style={styles.input}
                    placeholder="NAME"
                    placeholderTextColor={colors.placeholder}
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={styles.inputCard}>
                  <TextInput
                    style={styles.input}
                    placeholder="PRICE"
                    placeholderTextColor={colors.placeholder}
                    keyboardType="decimal-pad"
                    value={price}
                    onChangeText={setPrice}
                  />
                </View>
              </>
            )}

            <View style={styles.containerActions}>
              <TouchableOpacity
                style={[styles.containerBtn, styles.cancelBtn]}
                activeOpacity={0.8}
                onPress={closeModal}
              >
                <Text style={styles.containerBtnText}>CANCEL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.containerBtn}
                activeOpacity={0.8}
                onPress={handleSave}
              >
                <Text style={styles.containerBtnText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  rowSelected: {
    backgroundColor: colors.card2,
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
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1.5,
    borderColor: colors.border,
  },
  stockText: {
    fontSize: 14,
    fontFamily: interFonts.semibold,
    color: colors.text,
  },
  actionsCol: {
    width: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  smallBtn: {
    backgroundColor: colors.button,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  smallBtnText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: interFonts.semibold,
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

  footer: {
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  deleteBtn: {
    width: 115,
    height: 42,
    backgroundColor: colors.button,
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: radius.button,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  disabled: {
    opacity: 0.5,
  },
  deleteText: {
    color: colors.text,
    fontSize: 18,
    fontFamily: interFonts.semibold,
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  container: {
    backgroundColor: colors.card2,
    borderRadius: radius.card,
    padding: 16,
    gap: 12,
  },
  ProductTitle: {
    fontSize: 20,
    fontFamily: interFonts.medium,
    color: colors.text,
  },
  inputCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.input,
    paddingHorizontal: 14,
  },
  input: {
    height: 50,
    fontSize: 18,
    fontFamily: interFonts.semibold,
    color: colors.text,
  },
  containerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  containerBtn: {
    backgroundColor: colors.button,
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: radius.button,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  cancelBtn: {
    backgroundColor: colors.card,
  },
  containerBtnText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: interFonts.bold,
  },
});