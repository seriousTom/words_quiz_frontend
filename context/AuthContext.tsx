// /src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../api/axiosClient';
import { navigate } from '../navigation/RootNavigation'; // optional global navigation
import {authApi} from "../api/authApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // handles app init

    // --- Login ---
    const login = async (email, password) => {
        // const res = await axiosClient.post('/login', { email, password });
        const res = await authApi.login(email, password);
        const token = res.data.token;
        await AsyncStorage.setItem('token', token);
        setUserToken(token);
    };

    // --- Register ---
    const register = async (name, email, password, password_confirmation) => {
        // const res = await axiosClient.post('/register', { name, email, password, password_confirmation });
        const res = await authApi.register({ name, email, password, password_confirmation });
        const token = res.data.token; // adjust to your backend
        await AsyncStorage.setItem('token', token);
        setUserToken(token);
    };

    // --- Logout ---
    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUserToken(null);
        // navigate('Login'); // optional if you want to redirect immediately
    };

    // --- Load token on app start ---
    const loadToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) setUserToken(token);
        setIsLoading(false);
    };

    useEffect(() => {
        loadToken();
    }, []);

    return (
        <AuthContext.Provider value={{ userToken, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
