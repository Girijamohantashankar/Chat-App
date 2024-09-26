import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import Header from '../Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Friends() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState('');
  const [friendRequests, setFriendRequests] = useState({});

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          setAuthToken(token);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (authToken) {
      fetchUsersAndRequests();
    }
  }, [authToken]);

  const fetchUsersAndRequests = async () => {
    try {
      setLoading(true); 
      const [usersResponse, requestsResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/friends'), 
        axios.get('http://localhost:5000/api/friend-requests', {
          headers: { Authorization: `Bearer ${authToken}` },
        }), 
      ]);
      setUsers(usersResponse.data);
      const requestsMap = {};
      requestsResponse.data.forEach((request) => {
        if (request.receiver && request.sender) {
          requestsMap[request.receiver._id] = request.status;
        }
      });
      setFriendRequests(requestsMap);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users or friend requests:', error);
      setLoading(false);
    }
  };

  const handleFriendRequest = async (userId) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/send-friend-request',
        { receiverId: userId },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setFriendRequests((prev) => ({
        ...prev,
        [userId]: 'pending',
      }));

      alert(response.data.message);
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };


  const renderItem = ({ item }) => {
    const requestStatus = friendRequests[item._id]; 

    return (
      <View style={styles.userContainer}>
        <FontAwesome name="user" size={24} color="#000" style={styles.icon} />
        <Text style={styles.userName}>{item.userName}</Text>
        {requestStatus === 'accepted' ? (
          <Text style={styles.acceptedText}>Accepted</Text>
        ) : requestStatus === 'pending' ? (
          <Text style={styles.pendingText}>Pending</Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => handleFriendRequest(item._id)}>
            <Text style={styles.buttonText}>Send Friend Request</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Friends</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
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
  icon: {
    marginRight: 10,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    backgroundColor: "#ddd",
    borderRadius: 15,
  },
  userName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  pendingText: {
    color: 'orange',
    fontSize: 16,
    marginLeft: 10,
  },
  acceptedText: {
    color: 'green',
    fontSize: 16,
    marginLeft: 10,
  },
});
