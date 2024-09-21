import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter, Slot } from 'expo-router';
import useAuth from '../hooks/useAuth'; // Adjust the path as needed

export default function Layout() {
  const { loading, authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (authenticated === false) {
        router.replace('/login'); // Redirect if not authenticated
      }
    }
  }, [loading, authenticated, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />; // Render Slot to handle routing
}
