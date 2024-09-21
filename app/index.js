import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Header from './Header';

export default function Home() {
  const router = useRouter();
  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Home Page!</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
