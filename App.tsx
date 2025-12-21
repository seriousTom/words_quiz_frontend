import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from "./screens/Auth/Home";
import Main from "./screens/Home/Home";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import WordsList from "./screens/WordsManagement/WordsList";
import CategoriesList from "./screens/WordsManagement/CategoriesList";
import Profile from "./screens/Profile/Profile";
import Statistics from "./screens/Statistics/Statistics";
import Toast from 'react-native-toast-message';
import {AuthContext, AuthProvider} from "./context/AuthContext";
import {useContext} from "react";
import {navigationRef} from './navigation/RootNavigation';
import Game from "./screens/Game/Game";
import StartGame from "./screens/Game/StartGame";
import {GameProvider} from "./context/GameContext";

if (__DEV__) {
    require("./ReactotronConfig");
}

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const GameStack = createStackNavigator();

function RootNavigation() {
    const {userToken, isLoading} = useContext(AuthContext);
    if (isLoading) return null;

    return (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
            {!userToken ? (
                <RootStack.Screen name="Auth" component={AuthScreens}/>
            ) : (
                <>
                    <RootStack.Screen name="MainApp" component={MainApp}/>
                    <RootStack.Screen name="GameFlow" component={GameScreens}/>
                </>
            )}
        </RootStack.Navigator>
    );
}

function AuthScreens() {
    return <AuthStack.Navigator>
        <AuthStack.Screen name="Home" component={Home}/>
        <AuthStack.Screen name="Login" component={Login}/>
        <AuthStack.Screen name="Register" component={Register}/>
    </AuthStack.Navigator>;
}

function MainApp() {
    return <Drawer.Navigator>
        <Drawer.Screen name="Main" component={Tabs}/>
        <Drawer.Screen name="Words list" component={WordsList}/>
        <Drawer.Screen name="Categories list" component={CategoriesList}/>
    </Drawer.Navigator>;
}

function Tabs() {
    return <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="MainHome" component={Main}/>
        <Tab.Screen name="Statistics" component={Statistics}/>
        <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>;
}

function GameScreen(props) {
    return <GameProvider><Game {...props}/></GameProvider>;
}

function GameScreens() {
    return (
        <GameStack.Navigator>
            <GameStack.Screen name="StartGame" component={StartGame}/>
            <GameStack.Screen name="Game" component={GameScreen}/>
        </GameStack.Navigator>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer ref={navigationRef}>
                <RootNavigation></RootNavigation>
                <Toast/>
            </NavigationContainer>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({});
