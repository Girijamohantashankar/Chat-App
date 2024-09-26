import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        setMessage('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            const token = response.data.token;            
            await AsyncStorage.setItem('authToken', token);
            setMessage(response.data.message || 'Login successful');
            setMessageType('success');
            setLoading(false);
            router.push('/chats');
        } catch (error) {
            console.error('Error during login:', error);
            setMessage(error.response?.data?.message || 'Something went wrong');
            setMessageType('error');
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#00ff00" />
            ) : (
                <Button title="Login" onPress={handleLogin} />
            )}
            {message ? (
                <Text style={[styles.message, messageType === 'error' ? styles.error : styles.success]}>
                    {message}
                </Text>
            ) : null}

            <Text
                style={styles.signupText}
                onPress={() => router.push('/signup')}
            >
                Don't have an account? Sign up here.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#000',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 10,
        width: '100%',
    },
    signupText: {
        marginTop: 15,
        textAlign: 'center',
        color: 'blue',
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',
    },
    message: {
        marginTop: 15,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
    },
    success: {
        color: 'green',
    },
});
