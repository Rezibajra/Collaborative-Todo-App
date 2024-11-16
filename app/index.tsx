import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from 'react-native'
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        if (isAuthenticated()) {
            navigation.navigate('ProjectsScreen');
        } else {
            navigation.navigate('SignInScreen');
        }
    }, [])

    const isAuthenticated = () => {
        return true
    }
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator/>
        </View>
    )
}

export default SplashScreen