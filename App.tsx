import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from "./screens/Auth/Home";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import WordsList from "./screens/WordsManagement/WordsList";
import CategoriesList from "./screens/WordsManagement/CategoriesList";
import Profile from "./screens/Profile/Profile";
import Statistics from "./screens/Statistics/Statistics";
import Toast from 'react-native-toast-message';
import {AuthContext, AuthProvider} from "./context/AuthContext";
import {useContext} from "react";
import { navigationRef } from './navigation/RootNavigation';

if (__DEV__) {
    require("./ReactotronConfig");
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    return <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Statistics" component={Statistics}/>
        <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>;
}

function MainScreens() {
    const { userToken, isLoading } = useContext(AuthContext);

    if (isLoading) return null;

    if(!userToken) {
        return <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
        </Stack.Navigator>;
    }

    return <Drawer.Navigator>
        <Drawer.Screen name="Main" component={Tabs}/>
        <Drawer.Screen name="Words list" component={WordsList}/>
        <Drawer.Screen name="Categories list" component={CategoriesList}/>
    </Drawer.Navigator>;
}

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer ref={navigationRef}>
                <MainScreens></MainScreens>
                <Toast/>
            </NavigationContainer>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({});
