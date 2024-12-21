import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useQuery , gql} from '@apollo/client';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from 'jwt-decode';

const CURRENT_USER = gql `
query getUserProfile {
  getUserProfile {
        id
        name
        email
        avatar
  }
}
`;

export default function UserProfileScreen() {

    const { data, error, loading } = useQuery(CURRENT_USER);

    useEffect(() => {
        if (error) {
        console.error('Error fetching user profile:', error);
        Alert.alert('Error', error.message);
        }
    }, [error]);

    // If loading, show a loading indicator
    if (loading) {
        return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
        );
    }

    // If error or no data, handle accordingly
    if (error || !data || !data.getUserProfile) {
        return (
        <View style={styles.container}>
            <Text>Unable to load user profile</Text>
        </View>
        );
    }

    const user = data.getUserProfile;

    // const user = {
    //     name: 'John Doe',
    //     avatar: 'https://www.w3schools.com/howto/img_avatar.png', // Replace with a real image URL
    //     email: 'johndoe@example.com',
    // };

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                {/* Avatar */}
                <Image source={{ uri: "https://www.w3schools.com/w3images/avatar5.png" }} style={styles.avatar} />
                
                {/* Name */}
                <Text style={styles.name}>{user.name}</Text>

                {/* Email */}
                <Text style={styles.email}>{user.email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Outer background color (light gray)
        paddingTop: 20, // Adds space from the top
        paddingHorizontal: 20, // Adds horizontal padding for the outer container
      },
      container: {
        backgroundColor: 'white', // White background for the profile content
        borderRadius: 10, // Optional: Add rounded corners to the profile container
        padding: 20, // Padding inside the profile container
        alignItems: 'center', // Center the content horizontally
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50, // Make the image circular
        marginBottom: 20,
      },
      name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5, // Space between name and email
      },
      email: {
        fontSize: 16,
        color: '#777', // Lighter color for the email
        marginBottom: 20, // Space below the email
      },
  });