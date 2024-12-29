import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from "@react-native-async-storage/async-storage";
const URI = 'https://50a8-2404-7c00-44-9bb9-9ed6-610e-371a-1040.ngrok-free.app'

const httpLink = createHttpLink({
    uri: URI,
})

const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token || '',
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});