import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

const products = [
  { id: 1, name: 'Itlog', price: 10 },
  { id: 2, name: 'Nescafe', price: 17 },
  { id: 3, name: 'Bigas 1kl', price: 60 },
  { id: 4, name: 'Tuna', price: 35 },
  { id: 5, name: 'Noodles', price: 15 },
  { id: 6, name: 'Canton', price: 22 },
];

export default function SellScreen() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState('CASH');
  const [amountReceived, setAmountReceived] = useState('');

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const change = Math.max(0, Number(amountReceived || 0) - total);

  const addToCart = (product) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });
  };

  const charge = () => {
    if (cart.length === 0) {
      Alert.alert('No Products', 'Please select a product first.');
      return;
    }

    if (payment === 'CASH' && Number(amountReceived) < total) {
      Alert.alert('Insufficient Payment', 'Please enter the correct amount.');
      return;
    }

    Alert.alert(
      'Transaction Successful',
      `Total: ₱${total.toFixed(2)}\nPayment: ${payment}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setCart([]);
            setAmountReceived('');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <Text style={styles.searchIcon}>⌕</Text>
      </View>

      <ScrollView
        style={styles.productScroll}
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
      >
        {filteredProducts.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.productCard}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>₱{item.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.paymentContainer}>
        <Text style={styles.totalText}>₱{total.toFixed(2)}</Text>

        <View style={styles.paymentButtons}>
          <TouchableOpacity
            style={[
              styles.paymentButton,
              payment === 'CASH' && styles.activePayment,
            ]}
            onPress={() => setPayment('CASH')}
          >
            <Text style={styles.paymentText}>CASH</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentButton,
              payment === 'UTANG' && styles.activePayment,
            ]}
            onPress={() => setPayment('UTANG')}
          >
            <Text style={styles.paymentText}>UTANG</Text>
          </TouchableOpacity>
        </View>

        {payment === 'CASH' ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="AMOUNT RECEIVED"
              keyboardType="numeric"
              value={amountReceived}
              onChangeText={setAmountReceived}
            />

            <View style={styles.changeBox}>
              <Text style={styles.changeText}>
                CHANGE: ₱{change.toFixed(2)}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.changeBox}>
            <Text style={styles.changeText}>
              TOTAL UTANG: ₱{total.toFixed(2)}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.chargeButton}
          onPress={charge}
        >
          <Text style={styles.chargeText}>CHARGE</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B7D7E8',
    paddingHorizontal: 6,
    paddingTop: 7,
  },

  searchContainer: {
    height: 30,
    backgroundColor: '#FFF',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 5,
  },

  searchInput: {
    flex: 1,
    fontSize: 11,
    color: '#000',
    padding: 0,
  },

  searchIcon: {
    fontSize: 22,
    color: '#333',
  },

  productScroll: {
    flex: 1,
  },

  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },

  productCard: {
    width: '49%',
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 7,
    marginBottom: 5,
    padding: 7,
    justifyContent: 'center',
  },

  productName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
  },

  productPrice: {
    fontSize: 10,
    color: '#000',
  },

  paymentContainer: {
    backgroundColor: '#FFF',
    borderRadius: 7,
    padding: 9,
    marginBottom: 5,
  },

  totalText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },

  paymentButtons: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 4,
  },

  paymentButton: {
    flex: 1,
    height: 27,
    borderWidth: 1,
    borderColor: '#7FA3C4',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activePayment: {
    backgroundColor: '#E5F0F8',
  },

  paymentText: {
    fontSize: 10,
    color: '#000',
  },

  input: {
    height: 27,
    borderWidth: 1,
    borderColor: '#A8C1D6',
    borderRadius: 5,
    paddingHorizontal: 7,
    fontSize: 10,
    marginBottom: 4,
  },

  changeBox: {
    height: 27,
    borderWidth: 1,
    borderColor: '#A8C1D6',
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 7,
    marginBottom: 5,
  },

  changeText: {
    fontSize: 10,
    color: '#999',
  },

  chargeButton: {
    width: '50%',
    height: 27,
    alignSelf: 'center',
    backgroundColor: '#5489B8',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chargeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
  },
});