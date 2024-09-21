import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const router = useRouter();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            setMessageType('error');
            return;
        }

        setIsLoading(true); 
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                email,
                password,
            });
            const token = response.data.token;            
            await AsyncStorage.setItem('authToken', token);
            setMessage(response.data.message);
            setMessageType('success');
            setIsLoading(false); 
            router.push('/login');
        } catch (error) {
            console.error('Error during signup:', error);
            setMessage(error.response?.data?.message || 'Something went wrong');
            setMessageType('error');
            setIsLoading(false); 
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
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
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            {isLoading ? ( 
                <ActivityIndicator size="large" color="#00ff00" />
            ) : (
                <Button title="Sign Up" onPress={handleSignup} disabled={isLoading} /> 
            )}

            {message ? (
                <Text
                    style={[
                        styles.message,
                        messageType === 'error' ? styles.error : styles.success,
                    ]}
                >
                    {message}
                </Text>
            ) : null}

            <Text style={styles.loginText} onPress={() => router.push('/login')}>
                Already have an account? Log in here.
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
        marginBottom: 20,
        width: '100%',
    },
    loginText: {
        marginTop: 15,
        textAlign: 'center',
        color: 'blue',
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
