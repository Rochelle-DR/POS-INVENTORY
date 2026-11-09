
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import BackButton from "../../components/backButton";
import { API_URL } from "../../lib/api";
import { getToken } from "../../lib/session";

export default function CashierAccount() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const isEdit = !!id;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    const loadCashier = async () => {
      setLoading(true);

      try {
        const token = await getToken();

        const res = await fetch(`${API_URL}/api/cashiers/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            ...(token
              ? { Authorization: `Bearer ${token}` }
              : {}),
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Could not load cashier.");
        }

        setUsername(data.username || "");
      } catch (error) {
        console.error("Load cashier error:", error);
        Alert.alert(
          "Error",
          error.message || "Cannot reach the server."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCashier();
  }, [id]);


  const save = async () => {
    if (!username.trim()) {
      Alert.alert("Missing information", "Enter a username.");
      return;
    }

    if (!isEdit && !password) {
      Alert.alert("Missing information", "Enter a password.");
      return;
    }

    if (saving) return;

    setSaving(true);

    try {
      const token = await getToken();

      const body = {
        username: username.trim(),
      };

      if (password) {
        body.password = password;
      }

      const url = isEdit
        ? `${API_URL}/api/cashiers/<int:uid>${id}`
        : `${API_URL}/api/cashiers/<int:uid>`;

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token
            ? { Authorization: `Bearer ${token}` }
            : {}),
        },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.error || data.message || "Could not save cashier."
        );
      }

      Alert.alert(
        "Success",
        isEdit
          ? "Cashier updated successfully."
          : "Cashier account created successfully.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error("Save cashier error:", error);

      Alert.alert(
        "Connection Error",
        error.message || "Cannot reach the server. Check your connection."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
        >
          <BackButton />

          <View style={styles.card}>
            <Text style={styles.title}>
              {isEdit ? "EDIT CASHIER" : "ADD CASHIER"}
            </Text>

            {loading ? (
              <ActivityIndicator size="large" color="#1E4D8C" />
            ) : (
              <>
                <Text style={styles.label}>USERNAME</Text>

                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter username"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  editable={!saving}
                />

                <Text style={styles.label}>
                  {isEdit
                    ? "NEW PASSWORD (OPTIONAL)"
                    : "PASSWORD"}
                </Text>

                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder={
                    isEdit
                      ? "Leave blank to keep current password"
                      : "Enter password"
                  }
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  editable={!saving}
                />

                <TouchableOpacity
                  style={[
                    styles.button,
                    saving && { opacity: 0.6 },
                  ]}
                  onPress={save}
                  disabled={saving}
                >
                  <Text style={styles.buttonText}>
                    {saving
                      ? "PLEASE WAIT..."
                      : isEdit
                        ? "SAVE CHANGES"
                        : "CREATE ACCOUNT"}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#BBD9EE",
  },
  body: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4A7FC1",
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B2A41",
    marginBottom: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1B2A41",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4A7FC1",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 14,
    backgroundColor: "#fff",
    color: "#1B2A41",
  },
  button: {
    backgroundColor: "#1E4D8C",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 6,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "800",
  },
});
