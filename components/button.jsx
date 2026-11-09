import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors, radius } from "../constants/theme";

export default function Button({ title, onPress, loading }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [styles.btn, pressed && { opacity: 0.8 }]}
    >
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: "center",
    backgroundColor: colors.button,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: radius.button,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginTop: 10,
  },
  text: { color: "#000", fontWeight: "700", fontSize: 14 },
});