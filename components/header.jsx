
import { Image, StyleSheet, Text, View } from 'react-native';
import { fonts } from "../constants/theme";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/SmallStore.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View>
        <Text style={styles.title}>Small Store</Text>
        <Text style={styles.subtitle}>Management</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 156,
    backgroundColor: '#79A1CF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 12,
  },

  logo: {
    width: 80,
    height: 80,
  },

  title: {
  fontFamily: fonts.bold,
  fontSize: 30,
  color: "#000000",
 },

 
  subtitle: {
  fontFamily: fonts.semibold,
  fontSize: 24,
  fontWeight: '800',
  color: '#000000',
  marginTop:-12,

 
 },

});