import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const checkUser = async () => {
            if (await isAuthenticated()) {
                navigation.navigate('ProjectsScreen');
            } else {
                navigation.navigate('SignInScreen');
            }
        }
        checkUser();
    }, [])

    const isAuthenticated = async () => {
        const token = await AsyncStorage.getItem('token');
        return !!token;
    }
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator/>
        </View>
    )
}

export default SplashScreen