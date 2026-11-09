
import { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";

async function authHeaders() {
  const token = await getToken();

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function readResponse(res) {
  const text = await res.text();
  let data = {};

  if (text.trim()) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        `Server returned non-JSON data (HTTP ${res.status}).`
      );
    }
  }

  if (!res.ok) {
    throw new Error(
      data.error || data.message || `Request failed (HTTP ${res.status}).`
    );
  }

  return data;
}

export default function Cashier() {
  const router = useRouter();

  const [cashiers, setCashiers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);


  const load = useCallback(async () => {
    setLoading(true);

    try {
  const headers = await authHeaders();

  const res = await fetch(`${API_URL}/api/cashiers`, {
    method: "GET",
    headers,
  });

  const responseText = await res.text();

  console.log("STATUS:", res.status);
  console.log("RESPONSE:", responseText);

  const data = JSON.parse(responseText);

  console.log("CASHIERS:", data);

} catch (error) {
  console.log("ERROR:", error.message);
}

    try {
      const headers = await authHeaders();

      const res = await fetch(`${API_URL}/api/cashiers`, {
        method: "GET",
        headers,
      });

      const data = await readResponse(res);

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.cashiers)
        ? data.cashiers
        : null;

      if (!list) {
        throw new Error("Unexpected cashier list returned by the server.");
      }

      setCashiers(list);
    } catch (e) {
      console.log("Could not load cashiers:", e.message);
      Alert.alert("Error", e.message);
      setCashiers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setSelectedId(null);
      load();
    }, [load])
  );

  const openAdd = () => {
    setEditingId(null);
    setUsername("");
    setPassword("");
    setError("");
    setModalVisible(true);
  };


  const openEdit = (item) => {
    setEditingId(item.id);
    setUsername(item.username || "");
    setPassword("");
    setError("");
    setModalVisible(true);
  };


  const closeModal = () => {
    if (saving) return;

    setModalVisible(false);
    setError("");
  };

  const save = async () => {
    const cleanUsername = username.trim().toLowerCase();

    if (!cleanUsername) {
      setError("Enter a username.");
      return;
    }

    if (editingId === null && !password) {
      setError("Enter a password.");
      return;
    }

    if (password && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (saving) return;

    setSaving(true);
    setError("");

    try {
      const headers = await authHeaders();

      const body = {
        username: cleanUsername,
      };

      if (password) {
        body.password = password;
      }

      const isAdding = editingId === null;

      const url = isAdding
        ? `${API_URL}/api/cashiers`
        : `${API_URL}/api/cashiers/${editingId}`;

      const res = await fetch(url, {
        method: isAdding ? "POST" : "PUT",
        headers,
        body: JSON.stringify(body),
      });

      const data = await readResponse(res);

      setModalVisible(false);
      setUsername("");
      setPassword("");
      setEditingId(null);

      await load();

      Alert.alert(
        "Success",
        data.message ||
          (isAdding
            ? "Cashier account created successfully."
            : "Cashier account updated successfully.")
      );
    } catch (e) {
      console.log("Could not save cashier:", e.message);
      setError(e.message || "Could not save cashier.");
    } finally {
      setSaving(false);
    }
  };


  const onDelete = () => {
    if (selectedId === null) {
      Alert.alert(
        "Select a cashier",
        "Tap a cashier first, then press DELETE."
      );
      return;
    }

    Alert.alert(
      "Delete cashier",
      "Are you sure you want to delete this cashier?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const headers = await authHeaders();

              const res = await fetch(
                `${API_URL}/api/cashiers/${selectedId}`,
                {
                  method: "DELETE",
                  headers,
                }
              );

              const data = await readResponse(res);

              setSelectedId(null);
              await load();

              Alert.alert(
                "Success",
                data.message || "Cashier deleted successfully."
              );
            } catch (e) {
              console.log("Could not delete cashier:", e.message);
              Alert.alert("Error", e.message);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.back}
        hitSlop={10}
      >
        <Text style={styles.backText}>‹ Back</Text>
      </TouchableOpacity>

      <View style={styles.container}>

        <View style={styles.card}>
          <Text style={styles.title}>CASHIERS</Text>

          {loading && cashiers.length === 0 ? (
            <ActivityIndicator
              size="large"
              color="#1E4D8C"
              style={styles.loader}
            />
          ) : (
            <FlatList
              data={cashiers}
              keyExtractor={(item) => String(item.id)}
              style={styles.list}
              renderItem={({ item }) => {
                const selected = item.id === selectedId;

                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      setSelectedId(selected ? null : item.id)
                    }
                    style={[
                      styles.row,
                      selected && styles.rowSelected,
                    ]}
                  >
                    <View style={styles.cashierInfo}>
                      <Text style={styles.name}>
                        {item.username}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.smallBtn}
                      onPress={() => openEdit(item)}
                    >
                      <Text style={styles.smallBtnText}>EDIT</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <Text style={styles.empty}>
                  No cashiers yet.
                </Text>
              }
            />
          )}

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.smallBtn}
              onPress={openAdd}
            >
              <Text style={styles.smallBtnText}>ADD</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={onDelete}
            >
              <Text style={styles.smallBtnText}>DELETE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.overlay}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {editingId === null ? "ADD CASHIER" : "EDIT CASHIER"}
            </Text>

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
              {editingId === null
                ? "PASSWORD"
                : "NEW PASSWORD (OPTIONAL)"}
            </Text>

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder={
                editingId === null
                  ? "Enter password"
                  : "Leave blank to keep current password"
              }
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              editable={!saving}
            />

            {!!error && (
              <Text style={styles.error}>{error}</Text>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={closeModal}
                disabled={saving}
              >
                <Text style={styles.cancelText}>CANCEL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.saveBtn,
                  saving && { opacity: 0.6 },
                ]}
                onPress={save}
                disabled={saving}
              >
                <Text style={styles.saveText}>
                  {saving
                    ? "PLEASE WAIT..."
                    : editingId === null
                    ? "CREATE ACCOUNT"
                    : "SAVE"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#BBD9EE",
    paddingHorizontal: 16,
  },

  back: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    marginBottom: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B2A41",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4A7FC1",
    padding: 14,
    width: "90%",
    maxWidth: 360,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
    alignSelf: "flex-start",
  },

  loader: {
    marginVertical: 24,
  },

  list: {
    flexGrow: 0,
    maxHeight: 360,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#D6D6D6",
  },
  rowSelected: {
    backgroundColor: "#DCEBF7",
  },
  blankRow: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#D6D6D6",
  },
  cashierInfo: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  empty: {
    textAlign: "center",
    color: "#888888",
    paddingVertical: 16,
    fontSize: 14,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  smallBtn: {
    backgroundColor: "#4A7FC1",
    minWidth: 60,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 3,
    alignItems: "center",
  },
  smallBtnText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000000",
  },

  // MODAL
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4A7FC1",
    padding: 16,
    width: "100%",
    maxWidth: 360,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1B2A41",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4A7FC1",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#1B2A41",
    backgroundColor: "#FFFFFF",
  },
  inputDisabled: {
    backgroundColor: "#EEF3F8",
    color: "#6B7A8C",
  },
  error: {
    color: "#C0392B",
    fontSize: 12,
    marginTop: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#4A7FC1",
  },
  cancelText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4A7FC1",
  },
  saveBtn: {
    backgroundColor: "#1E4D8C",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  saveText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});