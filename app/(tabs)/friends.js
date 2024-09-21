import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Header from '../Header'; // Adjust path as needed

export default function Friends() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/friends'); // Adjust the URL to match your backend
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle friend request
  const handleFriendRequest = (userId) => {
    // Implement friend request logic here
    console.log(`Friend request sent to user with ID: ${userId}`);
    // Move the user to the Requests tab or update state as needed
  };

  // Render each user item
  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.name}</Text>
      <Button title="Send Friend Request" onPress={() => handleFriendRequest(item._id)} />
    </View>
  );

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Friends</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
            ListEmptyComponent={<Text>No friends found.</Text>}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userName: {
    fontSize: 16,
  },
});
