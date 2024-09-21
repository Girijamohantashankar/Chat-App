import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
const Header = ({ onNotificationPress }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>GSM Chat</Text>
      <TouchableOpacity onPress={onNotificationPress}>
        <Ionicons name="notifications-outline" size={15} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(12, 18, 20)',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Header;
