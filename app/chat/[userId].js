import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ChatScreen() {
  const route = useRoute();
  const { userId } = route.params;

  return (
    <View>
      <Text>Chat with User {userId}</Text>
    </View>
  );
}
