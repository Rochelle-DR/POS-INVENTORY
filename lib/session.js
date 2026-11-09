
import * as SecureStore from 'expo-secure-store';

export const saveSession = async (token, user) => {
  await SecureStore.setItemAsync('token', token);
  await SecureStore.setItemAsync('user', JSON.stringify(user));
};

export const getSession = async () => {
  const token = await SecureStore.getItemAsync('token');
  const user = await SecureStore.getItemAsync('user');
  return token && user ? { token, user: JSON.parse(user) } : null;
};

export const clearSession = async () => {
  await SecureStore.deleteItemAsync('token');
  await SecureStore.deleteItemAsync('user');
};

export const getToken = async () => {
  return await SecureStore.getItemAsync('token');
};