import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';
import Button from '../../components/button';
import { colors, radius } from '../../constants/theme';
import { saveSession } from '../../lib/session';

const HEADER_BLUE = colors?.primary ?? '#7BA1D1';
const BORDER = colors?.border ?? '#3F6AA8';
const BG = colors?.background ?? '#B9D8EC';
const R_CARD = radius?.lg ?? 18;
const R_INPUT = radius?.md ?? 8;

export default function LoginScreen() {
  const router = useRouter();
  const [role, setRole] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      setError('Please enter your username and password.');
      return;
    }

    setError('');

    await saveSession('local-token', { username: username.trim(), role });

    router.replace(role === 'admin' ? '/(admin)/home' : '/(cashier)/home');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.center}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <View style={styles.headerWrap}>
            <Header title="Small Store Management" />
          </View>

          <View style={styles.body}>
            <View style={styles.roleRow}>
              {['admin', 'cashier'].map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[styles.roleBtn, role === r && styles.roleBtnActive]}
                  onPress={() => {
                    setRole(r);
                    setError('');
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[styles.roleText, role === r && styles.roleTextActive]}
                  >
                    {r === 'admin' ? 'ADMIN' : 'CASHIER'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ marginTop: 10 }}>
              <TextInput
                style={styles.input}
                placeholder="USERNAME"
                placeholderTextColor="#B5B5B5"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TextInput
                style={styles.input}
                placeholder="PASSWORD"
                placeholderTextColor="#B5B5B5"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onSubmitEditing={handleLogin}
                returnKeyType="go"
              />
            </View>

            {!!error && <Text style={styles.error}>{error}</Text>}

            <View style={{ marginTop: 15 }}>
              <Button title="LOG IN" onPress={handleLogin} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  center: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },

  card: {
    borderRadius: R_CARD,
    overflow: 'hidden',
    backgroundColor: '#fff',
    minHeight: 500,
  },

  headerWrap: {
    backgroundColor: HEADER_BLUE,
  },

  body: {
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 30,
  },

  roleRow: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    gap: 6,
    marginBottom: 20,
  },
  roleBtn: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: BORDER,
    borderRadius: R_INPUT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  roleBtnActive: { backgroundColor: '#0059b1' },
  roleText: { fontSize: 18, fontWeight: '600', color: '#111' },
  roleTextActive: { color: '#fff' },

  input: {
    width: '90%',
    alignSelf: 'center',
    height: 60,
    borderWidth: 1.5,
    borderColor: BORDER,
    borderRadius: R_INPUT,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 15,
    color: '#111',
  },

  error: {
    color: '#C0392B',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
});