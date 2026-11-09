import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useSegments } from 'expo-router';

const tabs = [
  { name: 'home', icon: require('../assets/Myicons/Home.png') },
  { name: 'sell', icon: require('../assets/Myicons/Cart.png') },
  { name: 'utang', icon: require('../assets/Myicons/Utang.png') },
  { name: 'stock', icon: require('../assets/Myicons/Stock.png') },
  { name: 'product', icon: require('../assets/Myicons/Product.png') },
];

export function MyTabBar({ state }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const segments = useSegments();

 
  const base = segments
    .filter((s) => s.startsWith('('))
    .map((s) => `/${s}`)
    .join('');
  const current = segments[segments.length - 1];


  const available = state?.routes?.map((r) => r.name);
  const visibleTabs = available
    ? tabs.filter((t) => available.includes(t.name))
    : tabs;

  return (
    <View
      style={[
        styles.tabBar,
        { paddingBottom: insets.bottom, height: 60 + insets.bottom },
      ]}
    >
      {visibleTabs.map(({ name, icon }) => {
        const focused = current === name;

        return (
          <Pressable
            key={name}
            onPress={() => {
              if (!focused) router.navigate(`${base}/${name}`);
            }}
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            style={styles.tab}
          >
            <View
              style={[styles.iconBackground, focused && styles.activeBackground]}
            >
              <Image
                source={icon}
                resizeMode="contain"
                style={[
                  styles.icon,
                  {
                    opacity: focused ? 1 : 0.75,
                    transform: [{ scale: focused ? 1.12 : 1 }],
                  },
                ]}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#5793D0',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderTopWidth: 0,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconBackground: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    overflow: 'hidden',
  },
  activeBackground: {
    backgroundColor: '#B8DDF5',
  },
  icon: {
    width: 40,
    height: 40,
  },
});
