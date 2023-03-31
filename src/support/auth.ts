import AsyncStorage from "@react-native-async-storage/async-storage";

export function setClientToken(token: string): Promise<void> {
    return AsyncStorage.setItem('client_access_token', token);
}

export function getClientToken(): Promise<string | null> {
    return AsyncStorage.getItem('client_access_token');
}
