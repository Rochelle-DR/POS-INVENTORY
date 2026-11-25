import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

const initialDebts = [
  { id: 1, name: 'Juan Dela Cruz', amount: 500 },
  { id: 2, name: 'Maria Antipolo', amount: 500 },
  { id: 3, name: 'Mark Hernandez', amount: 500 },
  { id: 4, name: 'Marites Santos', amount: 500 },
];

export default function UtangScreen() {
  const [debts, setDebts] = useState(initialDebts);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const totalUtang = debts.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const addUtang = () => {
    if (!name.trim() || !amount || Number(amount) <= 0) {
      Alert.alert('Notice', 'Please complete the information.');
      return;
    }

    setDebts((previous) => [
      ...previous,
      {
        id: Date.now(),
        name: name.trim(),
        amount: Number(amount),
      },
    ]);

    setName('');
    setAmount('');

    Alert.alert('Success', 'New utang added!');
  };

  const markPaid = (id) => {
    Alert.alert(
      'Confirm Payment',
      'Mark this customer as PAID?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            setDebts((previous) =>
              previous.filter((item) => item.id !== id)
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CREDIT / UTANG</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Total Outstanding Utang</Text>
          <Text style={styles.summaryAmount}>
            ₱{totalUtang.toLocaleString('en-PH', {
              minimumFractionDigits: 2,
            })}
          </Text>
          <Text style={styles.summaryCount}>
            {debts.length} Unpaid Customers
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Credit/Utang List</Text>

        <View style={styles.listContainer}>
          {debts.length === 0 ? (
            <Text style={styles.empty}>
              No unpaid customers.
            </Text>
          ) : (
            debts.map((item) => (
              <View key={item.id} style={styles.debtItem}>
                <View style={styles.customerInfo}>
                  <Text style={styles.customerName}>
                    {item.name}
                  </Text>
                  <Text style={styles.amount}>
                    ₱{item.amount.toFixed(2)}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.paidButton}
                  onPress={() => markPaid(item.id)}
                >
                  <Text style={styles.paidText}>PAID</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <Text style={styles.sectionTitle}>Add New Utang</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Customer Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Amount (₱)"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={addUtang}
          >
            <Text style={styles.addButtonText}>
              + ADD UTANG
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#D6E9F5',
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  summary: {
    backgroundColor: '#A8D9EF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  summaryCount: {
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  listContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4B83BD',
    borderRadius: 8,
    minHeight: 200,
    padding: 8,
    marginBottom: 20,
  },
  debtItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 13,
    color: '#555',
  },
  paidButton: {
    backgroundColor: '#4B83BD',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 5,
  },
  paidText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  empty: {
    textAlign: 'center',
    padding: 30,
    color: '#777',
  },
  form: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 13,
    borderRadius: 7,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#4B83BD',
    padding: 15,
    borderRadius: 7,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});