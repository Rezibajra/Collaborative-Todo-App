import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const onSubmit = () => {

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

            <Pressable onPress={onSubmit} 
                style={{
                    backgroundColor: '#e33062',
                    height: 50,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
                <Text 
                    style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>Sign Up</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('index')} 
                style={{
                    height: 50,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
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