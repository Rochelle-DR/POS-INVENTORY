import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { Link, useRouter } from 'expo-router';
import Logo from '../assets/Store.png';

const Welcome = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Small Store Management</Text>
      <Text style={styles.subtitle}>
        Manage your Sales, stock, and utang.
      </Text>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => router.push('/register')}
      >
        <Text style={styles.buttonText}>CREATE ADMIN ACCOUNT</Text>
      </Pressable>

      <Link href="/login" style={styles.link}>
        Already have an account? Log in
      </Link>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fcfcfc',
    paddingHorizontal: 24,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#1F4E8C',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 32,
  },
  button: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    backgroundColor: '#4B80BB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.85 },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  link: {
    marginTop: 18,
    color: '#00050b',
    fontSize: 13,
  },
});
