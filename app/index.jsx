import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Logo from '../assets/Store.png';
import { colors, radius, fonts, interFonts } from '../constants/theme';

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
    backgroundColor: colors.screenBg,
    paddingHorizontal: 24,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.border,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: interFonts.regular,
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 32,
  },
  button: {
    width: '100%',
    height: 48,
    borderRadius: radius.button,
    backgroundColor: colors.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.85 },
  buttonText: {
    fontFamily: fonts.semibold,
    color: colors.card,
    fontSize: 14,
  },
  link: {
    fontFamily: interFonts.regular,
    marginTop: 18,
    color: colors.text,
    fontSize: 13,
  },
});
