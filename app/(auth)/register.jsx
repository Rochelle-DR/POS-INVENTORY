import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";

import { useRouter } from "expo-router";
import Header from "../../components/header";
import Input from "../../components/input";
import Button from "../../components/button";
import { colors, radius } from "../../constants/theme";
import { saveSession } from "../../lib/session";

export default function CreateAccount() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    password: "",
    confirm: "",
  });

  const set = (key) => (value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const onSubmit = async () => {
    const fullname = form.fullname.trim();
    const username = form.username.trim();
    const password = form.password;
    const confirm = form.confirm;

    if (!fullname || !username || !password || !confirm) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    if (password !== confirm) {
      Alert.alert("Password Error", "Passwords do not match.");
      return;
    }


    await saveSession("local-token", { fullname, username, role: "admin" });

   
    router.replace("/(admin)/home");
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Header />

          <View style={styles.body}>
            <Input
              placeholder="FULL NAME"
              value={form.fullname}
              onChangeText={set("fullname")}
              autoCapitalize="words"
            />

            <Input
              placeholder="USERNAME"
              value={form.username}
              onChangeText={set("username")}
              autoCapitalize="none"
            />

            <Input
              placeholder="PASSWORD"
              value={form.password}
              onChangeText={set("password")}
              secureTextEntry
              autoCapitalize="none"
            />

            <Input
              placeholder="CONFIRM PASSWORD"
              value={form.confirm}
              onChangeText={set("confirm")}
              secureTextEntry
              autoCapitalize="none"
            />

            <Button title="CREATE ACCOUNT" onPress={onSubmit} />

            <Pressable
              onPress={() => router.replace("/login")}
              style={styles.loginLink}
            >
              <Text style={styles.loginText}>
                Already have an account?{" "}
                <Text style={styles.loginBold}>LOG IN</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    borderRadius: radius.card,
    overflow: "hidden",
  },
  body: {
    backgroundColor: colors.body,
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 30,
  },
  loginLink: {
    marginTop: 18,
    alignItems: "center",
  },
  loginText: {
    fontSize: 13,
    color: "#1F4E8C", 
  },
  loginBold: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});