import { TextInput, StyleSheet } from "react-native";
import { colors, radius } from "../constants/theme";

export default function Input(props) {
  return (
    <TextInput
      placeholderTextColor={colors.placeholder}
      autoCapitalize="none"
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 54,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.input,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 14,
  },
});