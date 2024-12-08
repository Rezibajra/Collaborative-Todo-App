import { ApolloClient, InMemoryCache } from "@apollo/client";

const URI = 'https://637b-2404-7c00-41-e0cb-9fb6-e0e1-99e7-8c49.ngrok-free.app'

export const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache()
});