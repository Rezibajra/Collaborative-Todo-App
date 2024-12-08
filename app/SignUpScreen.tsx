import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { client } from '../apollo';

import { useMutation, gql } from "@apollo/client";

const SIGN_UP_MUTATION = gql`
mutation signUp($email: String!, $password: String!, $name: String!) {
  signUp(input: {email: $email, password: $password, name: $name}){
    token
    user {
      id
      name
      email
    }
  }
}
`;

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const [signUp, {data, error, loading}] = useMutation(SIGN_UP_MUTATION);
    
    if (error) {
        Alert.alert('Error signing up. Try again.')
    }
    
    if (data) {
        AsyncStorage
            .setItem('token', data.signUp.token)
            .then(() => {
                navigation.navigate('ProjectsScreen')
            })
    }

    const onSubmit = () => {
        signUp({variables: { name, email, password }})
    }

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={{
                    color: 'black',
                    fontSize: 18,
                    width: '100%',
                    marginVertical: 25,
                }}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{
                    color: 'black',
                    fontSize: 18,
                    width: '100%',
                    marginVertical: 25,
                }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{
                    color: 'black',
                    fontSize: 18,
                    width: '100%',
                    marginVertical: 25,
                }}
            />

            <Pressable disabled={loading} onPress={onSubmit} 
                style={{
                    backgroundColor: '#e33062',
                    height: 50,
                    borderRadius: 5,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
                    {loading && <ActivityIndicator />}
                <Text 
                    style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>Sign Up</Text>
            </Pressable>

            <Pressable disabled={loading} onPress={() => navigation.navigate('index')} 
                style={{
                    height: 50,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
                    {loading && <ActivityIndicator />}
                <Text 
                    style={{
                        color: '#e33062',
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>Already Have an account? Sign in</Text>
            </Pressable>
        </View>
    )
}

export default SignUpScreen;