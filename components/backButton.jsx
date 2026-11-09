import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function BackButton({ label = "‹ Back" }) {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} style={styles.btn} hitSlop={10}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { alignSelf: "flex-start", paddingVertical: 6, paddingHorizontal: 4, marginBottom: 8 },
  text: { fontSize: 16, fontWeight: "700", color: "#1B2A41" },
});