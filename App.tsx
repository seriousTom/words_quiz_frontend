import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./screens/Auth/Home";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import WordsList from "./screens/WordsManagement/WordsList";
import CategoriesList from "./screens/WordsManagement/CategoriesList";
import Profile from "./screens/Profile/Profile";
import Statistics from "./screens/Statistics/Statistics";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    return <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Statistics" component={Statistics} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>;
}


export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={Tabs} />
                <Drawer.Screen name="Words list" component={WordsList} />
                <Drawer.Screen name="Categories list" component={CategoriesList} />
            </Drawer.Navigator>
        </NavigationContainer>
    );

    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={Login} />
                <Drawer.Screen name="Profile" component={Register} />
            </Drawer.Navigator>
        </NavigationContainer>
    );

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Login} />
                <Tab.Screen name="Profile" component={Register} />
            </Tab.Navigator>
        </NavigationContainer>
    );

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({

});
